const express = require('express');
const axios = require('axios');
const GasPricesModel = require('../models/GasPrices');

/**
 * Queries the Etherscan API (using APIKEY from .env) for current gas fees. 
 * Checks if the response data is already in the database (by comparing 'LastBlock'), as to prevent redundant entries. If not, add to db.
 * Note: Etherscan free tier allows maximum of 5 API calls per second. 
 */
function fetchGasPrices(){
    /**
     * Helper closure for adding price to database
     * @param {res} res, the entire api result object.
     */
    function addToDatabase(res){
        const newGasPrice = new GasPricesModel();
        newGasPrice.LastBlock = res.data.result.LastBlock;
        newGasPrice.FastGasPrice = res.data.result.FastGasPrice;
        newGasPrice.AverageGasPrice =res.data.result.ProposeGasPrice;
        newGasPrice.LowGasPrice =res.data.result.SafeGasPrice;
        newGasPrice.UnixTime = Date.now()
        return (newGasPrice.save());
    };
    
    const FULLAPIURL='https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey='+process.env.ETHERSCAN_APIKEY
    console.log("fetching gas price..");
    axios.get(FULLAPIURL)
    .then(async res => {
        if (res.status===200){
            if(res.data.status!=1){
                throw new Error("API response message status not valid: "+JSON.stringify(res.data.result));
            }
            console.log("Succesful API call for data at block "+res.data.result.LastBlock)
            //check if database is empty (without this, the next code block will break upon first database entry)
            if(await GasPricesModel.findOne()===null){
                addToDatabase(res)
                .then(console.log("First price added to database."))
                .catch(err=>(
                    console.error("Add to database failure: "+err)
                ))
            }
            //check to see if the response data is novel to the database, by comparing response LastBlock against the newest LastBlock (highest numbered LastBLock) in the database.
            //this is necessary because we can query the API faster than the new block data might appear.
            else{
                let mostRecentPrice = await GasPricesModel.findOne().sort( { LastBlock: -1 } );
                if(mostRecentPrice.LastBlock == res.data.result.LastBlock){
                    console.log("Redundant Data. Not adding to database.")
                }
                else{
                    addToDatabase(res)
                    .then(console.log("New price added to database."))
                    .catch(err=>(
                        console.error("Add to database failure: "+err)
                    ))
                }
            }
        }
        else{
            throw new Error("External Etherscan API call failed (status code!=200). \nStatus: "+res.status+"\n"+JSON.stringify(res.data.result));
        }
    })
    .catch(error => {
    console.log('Error: ', error.message);
    });
};  

module.exports = {
    fetchGasPrices
};
