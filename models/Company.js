const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    CompanyName: {
        type: String,
        required: true,
    },
    Date:{
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

}, { collection: 'companies' })


const Company = mongoose.model('Company', companySchema)

module.exports = Company;