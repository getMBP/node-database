const express = require('express');
const bodyParser = require('body-parser');

const usersRepo = require('./repositories/users');
const productsRepo = require('./repositories/products');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


// User login front-end

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

// User create account - 'submit' button fn - (first state adds user to ./repositories/users.json)

app.post('/', async(req, res) => {
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email in use');
    }

    if (password !== passwordConfirmation) {
        return res.send('Passwords do not match');
    }


    // Create a user in our repo
    const user = await usersRepo.create({ email, password });

    // Store that id inside of a cookie for session auth
    res.send('Account Created!!!');
});


// {
//     "product": "Flat Rolled Steel",
//     "type": "Galvanized",
//     "grade": "Grade-80",
//     "defects": "none",
//     "weight": 46000,
//     "id": "185d9def"
// }

app.get('/products', (req, res) => {
    res.send(`
        <div>
        
            <form method="POST">
                <input name="product" placeholder="product" />
                <input name="type" placeholder="type" />
                <input name="grade" placeholder="grade" />
                <input name="defects" placeholder="defects" />
                <input name="weight" placeholder="weight" />
    
                <button>Add Product</button>
            </form>
        </div>
    `);
});

app.post('/products', async(req, res) => {
    const { product, type, grade, defects, weight } = req.body;

    const existingProduct = await productsRepo.getOneBy({ product });
    if (existingProduct) {
        return res.send('Product already added');
    }


    // Create a product in our repo
    const prod = await productsRepo.create({ product, type, grade, defects, weight });

    // Store that id inside of a cookie for session auth
    res.send('Product added!!!');
});


// App starts on port http://localhost:3000 localhost port #3000

app.listen(3000, () => {
    console.log("listening");
});