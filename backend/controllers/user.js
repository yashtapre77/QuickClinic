const user = require('../models/user');

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const newUser = new user({ name, email, password });
        await newUser.save();
        return res.render("home")
        // res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}


module.exports = {
    createUser
}   