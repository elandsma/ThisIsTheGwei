const mongoose = require('mongoose');

const GasPricesSchema = new mongoose.Schema({
    LastBlock:{
        type: Number
    },
    FastGasPrice:{
        type: Number
    },
    AverageGasPrice:{
        type: Number
    },
    LowGasPrice:{
        type: Number
    },
    UnixTime:{
        type: Number
    }
});

module.exports = mongoose.model('GasPricesModel', GasPricesSchema)
