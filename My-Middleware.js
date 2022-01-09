const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
    res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <input name="passwordConfirmation" placeholder="password confirmation" />
                <button>Sign Up!</button>
            </form>
        </div>
    `);
});

/**
 * Middleware for routing in an express app
 * @param {string} Req A request by the user
 * @param {string} res  A response by the server
 * @param {string} next Callback function to be given for the request
 */

const bodyParser = (req, res, next) => {
    if (req.method === 'POST') {
        req.on('data', data => {

            // Do something with this data from the form
               const parsed = data.toString('utf8').split('&');
               const formData = {};
               for (let pair of parsed) {
                   const [key, value] = pair.split('=');
                   formData[key] = value;
               }
                req.body = formData;
                next();
            });
    } else {
        next();
    }  
};


app.post('/', bodyParser, (req, res) => {
    console.log(req.body);
    res.send('Account Created!!!');
});


app.listen(3000, () => {
    console.log("listening");
});