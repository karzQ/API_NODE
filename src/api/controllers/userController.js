require('dotenv').config();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const validator = require("email-validator");
const bcrypt = require('bcrypt');

exports.create_an_user = async (req, res) => {
    if (!validator.validate(req.body.email)) {
        res.status(400);
        res.json({
            message: "Your email don't have a good format"
        })
    } else {
        // Encrypte le password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let userObj = {email : req.body.email, password: hashedPassword}
        let new_user = new User(userObj);

        console.log(new_user);

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
}

const decryptPassword = async (inputPassword, userPassword) => {
    // Compare la valeur du password hashé et celle en plaintext.
    bcrypt.compare(inputPassword, userPassword, (err, result) => {
        /* console.log('Input pwd: ', inputPassword);
        console.log('User pwd: ', userPassword);
        console.log("Result: ", result); */
        return result;
    });
}

exports.login_an_user = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            res.status(500);
            res.json({message: 'Internal server error.'});
        } else {
            if (decryptPassword(req.body.password, user.password)) {
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