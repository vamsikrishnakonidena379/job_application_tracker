const bcrypt= require("bcrypt");
const pool= require("../config/db");
const {signToken} = require("../utils/jwt");


exports.register = async(req,res)=>{

    const {email, password}= req.body;
    const hash= await bcrypt.hash(password,10);

    const result= await pool.query(
        "INSERT INTO users (email,password) VALUES ($1, $2) RETURNING id",
        [email, hash]
    );

    res.json({token: signToken({id: result.rows[0].id, email})});

}


exports.login = async(req,res)=>{
    const {email, password} = req.body;
    const result= await pool.query("SELECT * FROM USERS WHERE email=$1",[email]);

    if(!result.rows.length)
        return res.status(401).json({message: "Invalid credentials"});

    const valid= await bcrypt.compare(password, result.rows[0].password);
    if(!valid)
        return res.status(401).json({message: "Invalid credentials"});

    res.json({token: signToken({id:result.rows[0].id, email})});
}
