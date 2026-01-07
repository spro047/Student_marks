const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login', layout: 'layout_empty' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await user.comparePassword(password)) {
            req.session.user = { id: user._id, username: user.username };
            return res.redirect('/');
        }
        res.render('login', { title: 'Login', error: 'Invalid credentials', layout: 'layout_empty' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register', layout: 'layout_empty' });
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('register', { title: 'Register', error: 'User already exists', layout: 'layout_empty' });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;
