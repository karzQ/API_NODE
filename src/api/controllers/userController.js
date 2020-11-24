const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.create_an_user = (req, res) => {
    let new_user = new User(req.body);

    new_user.save((err, user) => {
        if (err) {
            res.status(500);
            res.json({message: 'Internal server error.'});
        } else {
            res.status(201);
            res.json({message: `Utilisateur créé : ${user.email}`});
            console.log("User successfully created !");
        }
    });
}

exports.login_an_user = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            res.status(500);
            res.json({message: 'Internal server error.'});
        } else {
            if (user.password === req.body.password) {
                // On crée un nouveau jeton d'accès
                jwt.sign({
                    email: user.email,
                    role: "user"
                }, process.env.JWT_SECRET, {expiresIn: '30 days'}, (err, token) => {
                    if (err) {
                        res.status(400);
                        console.log(err);
                        res.json({
                            message: "Mot de passe ou email erroné"
                        })
                    } else {
                        console.log(token);
                        res.json({
                            token: token
                        })
                    }
                });
                // process.env permet d'accéder aux propriétés stockées dans les fichiers .env
                // Ici on récupère la variable JWT_SECRET.
                // Toujours rester flou dans les messages d'erreur pour éviter que les utilisateurs insistent
            } else {
                res.status(400);
                console.log(err);
                res.json({
                    message: "Mot de passe ou email erroné"
                });
            }
        }
    })
}