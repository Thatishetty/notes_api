const db = require('../config/db');
//To Get All Notes
exports.getNotes = async(req,res) =>{
    const userId = req.user.userId;
    try{
        const [notes] = await db.query(
            'SELECT * FROM notes WHERE user_id = ?',
            [userId]
        );
    res.json(notes);
    }
    catch(err){
        console.error("getNotes error" ,err);
        res.status(500).json({message:"Internal Server Error"});
    }
    
};
//get note by ID
exports.getNote = async(req,res) =>{
    const userId = req.user.userId;
    const noteId = req.params.id;
    try{
        const [note] = await db.query(
            'SELECT * FROM notes WHERE id =? AND user_id =? ',
            [noteId,userId]);

    if (note.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

        res.json(note[0]);
    }catch(err){
        console.error("getNote Error",err);
        res.status(500).json({message:"nternal Server Error"});
    }
    
};

exports.createNote = async(req,res) =>{
    console.log("Incoming POST /api/notes");

    try{
        console.log("Request Body:",req.body);
        const {title , content} = req.body;
        const userId = req.user.userId;

        if(!title || !content){
            return res.status(400).json({message:"Title and Content Required"});
        }
         const [result] = await db.query(
            'INSERT INTO notes(title , content,user_id) VALUES(?,?,?)',
            [title , content,userId]
        );
        console.log("Insert result :",result);
        res.status(201).json({message : 'Note Created',id :result.insertId });

    }catch(err){
        console.error("❌ createNote error message:", err.message);
        console.error("📌 Full error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
//Update note Using ID 
exports.updateNote = async(req,res) =>{
    try{
        const {title , content} = req.body;
        const userId = req.user.userId;
        const noteId = req.params.id;
        if(!title || !content){
            return res.status(400).json({message:"Title and content required"});
        }
        const [result] = await db.query(
            'UPDATE notes SET title =? , content =? WHERE id =? AND user_id =?',
            [title,content,noteId,userId]);


        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }


        res.json({message:'Note Updated '});
    }catch(err){
        console.error("updateNote error",err);
        res.status(500).json({message:"Internal Server Error "})
    }

};

//Delete Note by Id
exports.deleteNote = async (req,res) =>{
    const userId = req.user.userId;
    const noteId = req.params.id;
    try{
        const [result] = await db.query(
            'DELETE FROM notes WHERE id =? AND user_id = ?',
            [noteId,userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }

        res.json({message:' Note Deleted'}); 
    }catch(err){
        console.error("deleteNote error",err);
        res.status(500).json({message: "Internal Server Error"});
    }
};