const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb+srv://vropokis:sapass@cluster0.nq9t2.mongodb.net/notes_vr?retryWrites=true&w=majority', ['categories'])

// Get All Categories
router.get('/categories', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    db.categories.find(function(err, categories){
        if(err){
            res.send(err);
        }
        res.json(categories);
    })
});

// Get Single Category
router.get('/category/:id', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    db.categories.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, category){
        if(err){
            res.send(err);
        }
        res.json(category);
    })
});

// Add Category
router.post('/category', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    let category = req.body;
    db.categories.save(category, function(err, category){
        if(err){
            res.send(err);
        }
        res.json(category);
    })
});

module.exports = router;