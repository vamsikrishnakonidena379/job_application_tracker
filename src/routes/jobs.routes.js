const express= require("express");
const router=express.Router();
const pool=require("../config/db");
const auth=require("../middleware/auth.middleware");
const {createJob, getJobs}= require("../controllers/jobs.controller");

router.use(auth);
router.post("/createjob",createJob);
router.get("/getjobs",getJobs)
router.put("/updatejob/:id", async(req, res)=>{

    const jobId= req.params.id;
    const userId= req.user.id;

    const {company, role, status, notes}=req.body;

    try{
        const result= await pool.query(
            `
            update jobs set company=$1,
                            role=$2,
                            status=$3,
                            notes=$4 
            where id=$5 and user_id=$6
            returning *
            `,[company, role, status, notes,jobId, userId]

        );

        if(result.rows.length===0)
        {
            return res.status.json(404).json({message: "Job not found or unauthorized"});
        }
        
        res.json(result.rows[0]);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Failed to update job"});

    }


});

router.delete("/deletejob/:id", async(req,res)=>{
    const jobId= req.params.id;
    const id= req.user.id;
    try{
    const result=await pool.query(
    `
    delete from jobs where id=$1 and user_id=$2 returning *
    `, [jobId, id]
    );

    if(result.rows.length===0)
    {
        return res.status(404).json({message:"Job not found or unauthorized"});
    }

    res.json({message:"Job deleted successfully"});
}catch(error)
{
    console.log(error);
    res.status(500).json({message:"unable to delete job"});

}

})


router.get("/getbystatus", async(req,res)=>{

    const userId= req.user.id;
    const {status}= req.query;

    let query= "select * from jobs where user_id=$1";
    let values=[userId];

    if(status)
    {
        query+=' and lower(status)=lower($2)';
        values.push(status);
    }

    try{
        const result= await pool.query(query,values);
        res.json(result.rows);
    }catch(error)
    {
        console.log(error);
        res.status(500).json({message:"unable to get jobs"});
    }

});

module.exports=router;

