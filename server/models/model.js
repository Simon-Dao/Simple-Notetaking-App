const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },    
    publishDate: {
        type: String,
        require: true
    },
    lastEdited: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
})

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },    
    publishDate: {
        type: String,
        require: true
    },
    lastEdited: {
        type: String,
        require: true
    },
    pages:[pageSchema]
}) 
module.exports = mongoose.model('notebook', schema)