const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubCategory = new Schema({
    name: String,
    catID: String
})

module.exports = mongoose.model('SubCategory', SubCategory)