const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    title: { 
        type: String,
        required: 'Kindly enter the title of the category'
    },
    image: { 
        type: String,
    },
    description: { 
        type: String, required: 'Kindly enter the description of the category'
    },
    created: {
        type: Date, default: Date.now
    },
    updated: {
        type: Date,default: Date.now
    }
})

module.exports = mongoose.model('Categories', CategorySchema);
