const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    name: String,
    model: String,
    price: Number,
    pic: String,
    catID: String,
    subCatID: String
})

module.exports = mongoose.model('Product', Product)