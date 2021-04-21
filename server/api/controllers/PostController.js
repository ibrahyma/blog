'use strict'

const mongoose = require('mongoose')
const Post = require('../models/Post')

exports.list_all_ports = (req, res) => {
    Post.find({}, (err, posts) => {
        err ? res.send(err) : res.json(posts)
    })
}

exports.read_a_post = (req, res) => {
    Post.findById(req.params.postId, (err, post) => {
        err ? res.send(err) : res.json(post)
    })
}

exports.create_a_post = (req, res) => {
    var new_post = new Post(req.body)

    new_post.save((err, post) => {
        err ? res.send(err) : res.json(post)
    })
}

exports.update_a_post = (req, res) => {
    Post.findOneAndUpdate({ _id: req.params.postId }, req.body, { new: true }, (err, post) => {
        err ? res.send(err) : res.json(post)
    })
}

exports.delete_a_post = (req, res) => {
    Post.deleteOne({ _id: req.params.postId }, (err) => {
        err ? res.send(err) : res.json({ message: 'Post successfully deleted' })
    })
}