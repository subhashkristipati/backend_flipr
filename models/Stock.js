const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
    StockType: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true
    },
    Open: {
        type: Number,
        required: true
    },
    High: {
        type: Number,
        required: true
    },
    Low: {
        type: Number,
        required: true
    },
    Close: {
        type: Number,
        required: true
    },
    AdjClose: {
        type: Number,
        required: true
    },
    Volume: {
        type: Number,
        required: true
    }

}, { collection: 'stocks' })


const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock