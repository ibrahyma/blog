const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: 'Kindly enter the title on the post'
    },
    title_description: {
        type: String,
        required: 'Kindly enter a title description on the post'
    },
    image: {
        type: String
    },
    content: {
        type: String,
        required: 'Kindly enter the content on the post'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Categories"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Posts', PostSchema)