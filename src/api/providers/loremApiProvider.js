const axios = require('axios');

const baseUrl = "https://loripsum.net/api";

/* exports.getRandomText = () => {

    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/plaintext`, {responType: 'text'}).then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(false);
            console.log(err);
        })
    })
    
} */

exports.getRandomText = async () => {
    return await axios.get(`${baseUrl}/plaintext`, {responType: 'text'});
}