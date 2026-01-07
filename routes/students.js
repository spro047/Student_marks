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

router.use(isAuthenticated);

// Page to add a student
router.get('/add', (req, res) => {
    res.render('add-student', { title: 'Add Student' });
});

// Process adding student
router.post('/add', async (req, res) => {
    const { rollNo, name } = req.body;
    try {
        const student = new Student({ rollNo, name });
        await student.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('add-student', { title: 'Add Student', error: 'Roll No already exists' });
    }
});

// Page to edit marks
router.get('/edit/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.render('edit-marks', { title: 'Edit Marks', student });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// Process editing marks
router.post('/edit/:id', async (req, res) => {
    try {
        const { subjects } = req.body;
        // subjects is an object with { math: { internal1: x, internal2: y }, ... }
        // Express might need some help parsing this if it's sent as flat fields
        // I'll handle flat fields for simplicity in the form

        const updateData = {
            'subjects.mathematics.internal1': req.body.math_int1,
            'subjects.mathematics.internal2': req.body.math_int2,
            'subjects.physics.internal1': req.body.phys_int1,
            'subjects.physics.internal2': req.body.phys_int2,
            'subjects.chemistry.internal1': req.body.chem_int1,
            'subjects.chemistry.internal2': req.body.chem_int2,
            'subjects.electronics.internal1': req.body.elec_int1,
            'subjects.electronics.internal2': req.body.elec_int2,
            'subjects.electrical.internal1': req.body.ele_int1,
            'subjects.electrical.internal2': req.body.ele_int2,
            'subjects.programming.internal1': req.body.prog_int1,
            'subjects.programming.internal2': req.body.prog_int2,
            'subjects.mechanics.internal1': req.body.mech_int1,
            'subjects.mechanics.internal2': req.body.mech_int2,
            'subjects.graphics.internal1': req.body.graph_int1,
            'subjects.graphics.internal2': req.body.graph_int2,
        };

        await Student.findByIdAndUpdate(req.params.id, { $set: updateData });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

module.exports = router;
