const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

exports.list_all_post_comments = (req, res) => {
    // Effectue un where post_id === req.params.post_id
    // Equivalent d'un SELECT * FROM comment WHERE post_id = req.params.post_id
    Comment.find({post_id: req.params.post_id}, (err, comments) => {
        if (err) {
            res.status(500);
            res.json({message: 'Internal server error.'});
        } else {
            res.status(200);
            res.json(comments);
            console.log("All comments : ", comments);
        }
    })
}

exports.get_one_comment = (req, res) => {
    Comment.findById(req.params.comment_id, (err, comment) => {
        if (err) {
            res.status(500);
            res.json({message: 'Internal server error.'})
        } else {
            res.status(400);
            res.json(comment);
            console.log("The comment : ", comment);
        }
    })
}

exports.list_all_comments = (req, res) => {
    // Equivalent d'un SELECT * FROM comment
    Comment.find({}, (err, comments) => {
        if (err) {
            res.status(500);
            res.json({message: 'Internal server error.'});
        } else {
            res.status(200);
            res.json(comments);
            console.log("All comments : ", comments);
        }
    })
}



exports.create_a_comment = (req, res) => {

    // Normalement on fait déjà un get de l'élément parent avant de save.
    // Donc vérifier que le Post, identifié par le post_id existe, si c'est le cas, faire un save.
    
    Post.findById(req.params.post_id, (err, post) => {
        if (err) {
            console.log('ERRROR - Post not found');
            res.status(500);
            res.json({message: 'Internal server error.'});
        } else if (post) {
            console.log('Post found');
            const payload = jwt.decode(req.headers['authorization']);
            const new_comment = new Comment({
                ...req.body,
                name: payload.email,
                post_id: req.params.post_id
            });

            new_comment.save((err, comment) => {
                if (err) {
                    res.status(500);
                    res.json({message: 'Internal server error.'});
                } else {
                    res.status(201);
                    res.json(comment);
                    console.log('Successfully created the comment : ', comment);
                }
            })
        }
    })
}

exports.update_a_comment = (req, res) => {
    const id = req.params.comment_id;
    Comment.findByIdAndUpdate(id, req.body, {new: true}, (err, comment) => {

        if (err) {
            res.status(500);
            res.json({message: 'Internal server error.'});
        } else {
            res.status(200);
            res.json(comment);
            console.log("The updated comment : ", comment);
        }
    })
}

exports.delete_a_comment = (req, res) => {
    const id = req.params.comment_id;

    Comment.findByIdAndRemove(id, (err, comment) => {
        if (err) {
            res.status(500);
            res.json({message: 'Internal server error.'});
        } else {
            res.status(200);
            res.json({message: `Data successfully deleted !`});
            console.log("Data successfully deleted !");
        }
    })
}