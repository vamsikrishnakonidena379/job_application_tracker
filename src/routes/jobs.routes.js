const express= require("express");
const router=express.Router();
const auth=require("../middleware/auth.middleware");
const {createJob, getJobs}= require("../controllers/jobs.controller");

router.use(auth);
router.post("/createjob",createJob);
router.post("/getjobs",getJobs)
module.exports=router;

