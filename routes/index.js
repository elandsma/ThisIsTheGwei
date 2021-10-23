const express = require('express');
const router = express.Router();
const GasPricesModel = require('../models/GasPrices');

/**
 * GET most recent gas price (as sorted by block number)
 */
router.get('/gas', async (req,res) =>{
    try{
        if(await GasPricesModel.findOne()===null){
            throw new Error("Database is empty");
        }    
        const mostRecentPrice = await GasPricesModel.findOne().sort( { LastBlock: -1 } );
        returnObject={
            "Error":false,
            "Message": {
                "FastGasPrice": mostRecentPrice.FastGasPrice,
                "AverageGasPrice": mostRecentPrice.AverageGasPrice,
                "SlowGasPrice": mostRecentPrice.SlowGasPrice,
                "UnixTime": mostRecentPrice.UnixTime,
                "BlockNum": mostRecentPrice.LastBlock,
            }
        }
        res.json(returnObject);
    }
    catch(error){
        res.json(
            {"Error":true,
            "Message":error.message
            }
        )
    }
})

/**
 * GET average gas price between chosen dates, in Gwei
 * @param {integer} fromTime - beginning of range, inclusive, Unix timestamp format
 * @param {integer} toTime - end of range, inclusive, Unix timestamp format.
 */
router.get("/average", async (req,res)=>{
    try{
        if(!req.query.fromTime || !req.query.toTime){
            throw new Error("Required parameters not specified. Need fromTime and toTime.");
        }
        if(parseInt(req.query.toTime) <= parseInt(req.query.fromTime)){
            throw new Error("toTime must be > fromTime");
        }
        if(await GasPricesModel.findOne()===null){
            throw new Error("Database is empty");
        }   
        else{
            let numberOfPrices=0;
            let priceSum=0;
            fromTime = parseInt(req.query.fromTime);
            toTime = parseInt(req.query.toTime);
            if(toTime > Date.now()){
                toTime = Date.now()
                //average itself does not change, however return response will represent more accurate data.
            }
            let allDocs = await GasPricesModel.find({UnixTime:{ $gte: fromTime,  $lte: toTime}})
            allDocs.forEach( function(gasFee){
                if(gasFee.AverageGasPrice){
                    priceSum += gasFee.AverageGasPrice;        
                    numberOfPrices++;
                }
            })
            if (numberOfPrices===0){
                throw new Error("Cannot calculate average: No prices in database for chosen interval.");
            }
            let averagePrice=+(Math.round((priceSum/numberOfPrices) + "e+9")  + "e-9")
            res.json({
                "Error":false,
                "Message":{
                    "averageGasPrice": averagePrice,
                    "fromTime": fromTime,
                    "toTime": toTime,
                    "numberOfDataPointsInRange": numberOfPrices
                }
            });
        }
    }
     catch(error){
        res.json(
            {"Error":true,
            "Message":error.message
            }
        )
     };
     //optional idea: if no fromTime and toTime, send current (or most recent) average
})

module.exports = router;