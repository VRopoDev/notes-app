const express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
const db = mongojs('mongodb+srv://vropokis:sapass@cluster0.nq9t2.mongodb.net/notes_vr?retryWrites=true&w=majority', ['notes'])


// Get All Notes
router.get('/notes', function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    db.notes.find(function(err, notes){
        if(err){
            res.send(err);
        }
        res.json(notes);
    })
});

// Get Single Note
router.get('/note/:id', function(req, res, next){
    db.notes.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, note){
        res.header('Access-Control-Allow-Origin', '*');
        if(err){
            res.send(err);
        }
        res.json(note);
    })
});



// Add Note
router.post('/note', function(req, res, next){
    let note = req.body;
    res.header('Access-Control-Allow-Origin', '*');
    if(!note.title){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.notes.save(note, function(err, note){
            if(err){
                res.send(err);
            }
            res.json(note);
        });
    }
});

// Delete Note
router.delete('/note/:id', function(req, res, next){
    db.notes.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, note){
        res.header('Access-Control-Allow-Origin', '*');
        if(err){
            res.send(err);
        }
        res.json(note);
    })
});

// Update Note
router.put('/note/:id', function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    db.notes.updateOne({_id: mongojs.ObjectId(req.params.id)}, 
    { $set: { "title": req.body.title, "body": req.body.body, "category": req.body.category, "priority": req.body.priority }},
    { upsert: false });   
});

module.exports = router;