'use strict';

const Category = require("../models/Category")
const Post = require("../models/Post")

exports.list_all_categories = (req, res) => {

    Category.find({}, (err, categories) => {
        if (err) {
            res.send(err)
            return
        }

        res.json(categories);
    });
};

exports.read_a_category = (req, res) => {
    Category.findById(req.params.categoryId, (err, category) => {
        if (err) {
            res.send(err);
            return
        }
        
        res.json(category);
    });
};

exports.create_a_category = (req, res) => {
    const new_category = new Category(req.body);
    
    new_category.save(function(err, category) {
        if (err) {
            res.send(err);
            return
        }

        // res.locals.io.emit("message",  { action: "created", type:"category", data: category });
        res.json(category);
    });
};

exports.update_a_category = (req, res) => {
    Category.findOneAndUpdate({_id: req.params.categoryId}, req.body, {new: true}, function(err, category) {
        if (err) {
            res.send(err)
            return
        }
        
        // res.locals.io.emit("message",  {action: "updated", type:"category", data: category});
        res.json(category);
    });
};

exports.delete_a_category = (req, res) => {
    Category.deleteOne({ _id: req.params.categoryId }, (err, category) => {
        if (err) {
            res.send(err)
            return
        }
        
        res.json({ message: 'Category successfully deleted' });
    });
}