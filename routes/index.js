const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/auth/login');
};

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const students = await Student.find();
        res.render('index', { title: 'Dashboard', students });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
