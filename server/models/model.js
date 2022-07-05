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
    color: {
        type: String,
        required: true
    },
    publishDate: {
        type: String,
        require: true
    },
    lastEdited: {
        type: String,
        require: true
    },
    pages: {
        type: Array,
        require: false
    }
}) 
module.exports = mongoose.model('notebook', schema)