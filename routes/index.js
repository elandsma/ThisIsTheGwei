const express = require('express');
const router = express.Router();
const GasPricesModel = require('../models/GasPrices');

/**
 * GET most recent gas price (as sorted by block number)
 */
router.get('/gas', async (req,res) =>{
    console.log("Server queried for most recent gas price.")
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
    console.log("Server queried for average gas price.")
    try{
        if(!req.query.fromTime || !req.query.toTime){
            throw new Error("Required parameters not specified. Need fromTime and toTime.");
        }
        if(await GasPricesModel.findOne()===null){
            throw new Error("Database is empty");
        }   
        let fromTime = parseInt(req.query.fromTime);
        let toTime = parseInt(req.query.toTime);
        if(isNaN(fromTime) || isNaN(toTime)){
            throw new Error("toTime and fromTime must be integers, Unix Timestamp format");
        }
        if(toTime < fromTime){
            throw new Error("toTime must be >= fromTime");
        }
        let numberOfPrices=0;
        let priceSum=0;
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
        let fromTimeUsed = await GasPricesModel.findOne({UnixTime:{ $gte: fromTime,  $lte: toTime}}).sort( { UnixTime: 1} )
        let toTimeUsed = await GasPricesModel.findOne({UnixTime:{ $gte: fromTime,  $lte: toTime}}).sort( { UnixTime: -1} )
        let averagePrice=+(Math.round((priceSum/numberOfPrices) + "e+9")  + "e-9")
        res.json({
            "Error":false,
            "Message":{
                "averageGasPrice": averagePrice,
                "fromTime": fromTimeUsed.UnixTime,
                "toTime": toTimeUsed.UnixTime,
                "pricesUsedToCalculateAverage": numberOfPrices
            }
        });
    }
     catch(error){
        res.json(
            {"Error":true,
            "Message":error.message
            }
        )
     };
})

module.exports = router;