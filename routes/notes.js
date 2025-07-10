const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

router.use(auth); // Protect all routes below

const{
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
}=require('../controllers/notesController');

router.get('/',getNotes);
router.get('/:id',getNote);
router.post('/',createNote);
router.put('/:id',updateNote);
router.delete('/:id',deleteNote);

module.exports = router;
