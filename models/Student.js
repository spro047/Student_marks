const mongoose = require('mongoose');

const SubjectMarksSchema = new mongoose.Schema({
    internal1: { type: Number, default: 0 },
    internal2: { type: Number, default: 0 }
});

const StudentSchema = new mongoose.Schema({
    rollNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    subjects: {
        mathematics: { type: SubjectMarksSchema, default: () => ({}) },
        physics: { type: SubjectMarksSchema, default: () => ({}) },
        chemistry: { type: SubjectMarksSchema, default: () => ({}) },
        electronics: { type: SubjectMarksSchema, default: () => ({}) },
        electrical: { type: SubjectMarksSchema, default: () => ({}) },
        programming: { type: SubjectMarksSchema, default: () => ({}) },
        mechanics: { type: SubjectMarksSchema, default: () => ({}) },
        graphics: { type: SubjectMarksSchema, default: () => ({}) }
    }
});

module.exports = mongoose.model('Student', StudentSchema);
