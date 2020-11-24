
require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Next va servir comme une fonction
exports.verify_token = (req, res, next) => {
    let token = req.headers['authorization'];

    if (typeof token !== 'undefined') {
        jwt.verify(token, JWT_SECRET, (err) => {
            console.log('secret token ', JWT_SECRET);
            if (err) {
                // Renvoie le code statut + le nom par défaut défini par l'erreur.
                // res.sendStatus(403);
                res.status(403);
                res.json({
                    message: "Accès interdit."
                })
            } else {
                // Permet de dire à la requête de continuer.
                next();
            }
        })
    } else {
        res.status(403);
        res.json({
            message: "Accès interdit."
        })
    }
}
