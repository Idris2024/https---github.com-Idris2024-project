// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.json());

// app.post('/sign-up', (req, res) => 
//     {
//         const { Firstname, Lastname, Email, Phonenumber, Password } = req.body;
        
//         if(!Firstname || !Lastname || !Email || !Phonenumber || !Password){
//             return
//             res.status(400).send('All fields are required');
//         }
//         }

    
// )


const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory database to store user data
const users = [];

// POST /sign up
app.post('/sign-up', (req, res) => {
    const { Firstname, Lastname, Email, Phonenumber, Password } = req.body;
    
    if (!Firstname || !Lastname || !Email || !Phonenumber || !Password) {
        return res.status(400).send('All fields are required');
    }

    // Check if user already exists
    const existingUser = users.find(user => user.Email === Email);
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    // Add user to the in-memory database
    users.push({ Firstname, Lastname, Email, Phonenumber, Password });
    res.status(201).send('User registered successfully');
});

// POST /sign in
app.post('/sign-in', (req, res) => {
    const { Email, Password } = req.body;

    // Basic validation
    if (!Email || !Password) {
        return res.status(400).send('Email and Password are required');
    }

    // Find user in the database
    const user = users.find(user => user.Email === Email && user.Password === Password);
    if (!user) {
        return res.status(401).send('Invalid Email or Password');
    }

    res.status(200).send('Sign-in successful');
});

// GET /user
app.get('/user', (req, res) => {
    res.status(200).json(users);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

