const pool= require("../config/db");

exports.createJob= async (req, res)=>{
    const {company, role, status, notes}= req.body;

    const result= await pool.query(
        `insert into jobs(user_id, company, role, status, notes)
        values ($1, $2, $3, $4, $5)
        returning *
        `,[req.user.id, company, role, status, notes]
    );

    res.status(201).json(result.rows[0]);

};
