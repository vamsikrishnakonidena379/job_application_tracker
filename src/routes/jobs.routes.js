const express= require("express");
const router=express.Router();
const auth=require("../middleware/auth.middleware");
const {createJob}= require("../controllers/jobs.controller");

router.use(auth);
router.post("/",createJob);
module.exports=router;

