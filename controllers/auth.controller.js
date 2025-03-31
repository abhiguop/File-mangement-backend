const authService = require('../services/auth.service');

async function register(req, res, next) {
    try {
        const { email, password } = req.body; 

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await authService.registerUser(email, password);
        res.status(201).json({ message: 'User registration successful' }); // Proper JSON response
    } catch (err) {
        if (err.code === 11000) { // MongoDB duplicate error
            return res.status(400).json({ message: 'User already exists' });
        }
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body; 

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        const token = await authService.login(email, password);
        res.json({ token });
    } catch (err) {
        if (err.message === 'Invalid Credentials') { 
            return res.status(401).json({ message: err.message });
        }
        next(err);
    }
}

module.exports = { register, login };
