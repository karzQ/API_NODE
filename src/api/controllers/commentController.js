const Comment = require('../models/commentModel');

exports.list_all_comments = (req, res) => {
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

exports.create_a_comment = (req, res) => {

    const new_comment = new Comment({
        ...req.body,
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