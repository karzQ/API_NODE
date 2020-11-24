const Post = require('../models/postModel');
const axios = require('axios');
const { base } = require('../models/postModel');

// Works
exports.list_all_post = (req, res) => {
    // Return all Posts
    Post.find({}, (err, data) => {
        if (err) {
            res.status(500);
            res.json({message: 'Internal server error.'});
        } else {
            res.status(200);
            res.json(data);
            console.log("All posts : ", data);
        }
    });
}

// Method 1
exports.get_one_post = (req, res) => {
    Post.findById(req.params.post_id, (err, data) => {
        if (err) {
            res.status(500);
            res.json({message: 'Internat server error.'});
        } else if (!data) {
            res.status(404);
            res.json({message: `Can't retrieve specified data.`});
        } else {
            res.status(200);
            res.json(data);
            console.log("The post obtained : ", data);
        }
    });
}

// Method 2 : Mais pas optimisée
// Car find renvoi un tableau, ici on ne veut qu'un seul élément
/* exports.get_one_post = (req, res) => {
    const id = req.params.post_id;
    Post.find({id: id}, (err, data) => {
        if (err) {
            res.status(500);
            res.json({message: 'Internat server error.'});
        } else if (!data) {
            res.status(404);
            res.json({message: `Can't retrieve specified data.`});
        } else {
            res.status(200);
            res.json(data);
            console.log("The post obtained : ", data);
        }
    });
} */

const loremApiProvider = require('../providers/loremApiProvider');

// Ma version
exports.create_a_post = async (req, res) => {
    let obj_post = {...req.body};

    if (!req.body.content) {
        const baseUrl = "https://loripsum.net/api";
        const content = await axios.get(`${baseUrl}/plaintext`, {responseType: "text"});
        
        obj_post = {...obj_post, content: content.data};
    }
    
    const new_post = new Post(obj_post);

    new_post.save((err, post) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.json({message: 'Internal server error.'});
        } else {
            res.status(201);
            res.json(post);
            console.log("Created post value : ", post);
        }
    });
}

exports.update_a_post = (req, res) => {
    if (!req.body) {
        res.status(400);
        res.json({message: `Data to update can't be empty.`});
    }

    const id = req.params.post_id;

    // Modifie la ressource mais ne retourne pas la version modifié, si l'on n'ajoute pas {new: true} en option
    Post.findByIdAndUpdate(id, req.body, {new: true}, (err, post) => {

        console.log("Data", post)
        console.log('update values : ', req.body);

        if (err) {
            res.status(500);
            res.json({message: 'Internal server error.'});
        } else {
            res.status(200);
            res.json(post);
            console.log("The updated post : ", post);
        }
    });
}

// Method 1
exports.delete_a_post = (req, res) => {
    const id = req.params._postid;

    Post.findByIdAndRemove(id, (err, data) => {

        console.log("Data", data)

        if (err) {
            res.status(500);
            res.json({message: 'Internal server error.'});
        } else {
            res.status(200);
            res.json({message: `Data successfully deleted !`});
            console.log("Data successfully deleted !");
        }
    });
}


// Method 2
/* exports.delete_a_post = (req, res) => {

    Post.remove({id: req.params.id}, (err, data) => {

        console.log("Data", data)

        if (err) {
            res.status(500);
            res.json({message: 'Internal server error.'});
        } else {
            res.status(200);
            res.json({message: `Data successfully deleted !`});
            console.log("Data successfully deleted !");
        }
    });
} */