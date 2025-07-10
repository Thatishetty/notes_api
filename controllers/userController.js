const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async(req,res) =>{
    const { userName ,email, pass} = req.body;
    // console.log("💡 userName:", userName, "| email:", email, "| pass:", pass);
    try{
        const hashedPass= await bcrypt.hash(pass,10);
        await db.query(
            'INSERT INTO users (userName, email , pass) VALUES (?,?,?)',
            [userName , email, hashedPass]
        );
        res.status(201).json({message:"User Registered Succesfully "});
    }catch(err){
        console.error("Registration Error",err);
        res.status(500).json({message:"Registrstion Failed"});
    }
};

exports.login = async(req,res) =>{
    const {userName , pass} = req.body;
    try{
        const [rows] = await db.query(
            'SELECT * FROM users WHERE userName =?',
            [userName]
        );

        const user = rows[0];
        if(!user) return res.status(401).json({message:'Invalid Credentials' });

        const isMatch = await bcrypt.compare(pass, user.pass);
        if(!isMatch) return res.status(401).json({message :'Invalid credentials' });

        const token = jwt.sign({ userId :user.id},process.env.JWT_SECRET,{
            expiresIn: '1h',
        });

        res.json({token});
    }catch(err){
        console.error("Login Error :",err);
        res.status(500).json({message:'Login Failed '});
    }
};