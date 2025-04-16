import express from "express"
import { kuisonerControllers } from "../controller/kuisonerController.js";
import { loginController } from "../controller/loginController.js";
// import { probalitasPrior } from "../controller/naiveBayesControler.js";
const router = express.Router();



router.get('/getQchat10', async(req,res)=>{
    const result = await kuisonerControllers(req,res)
    res.status(200).json({message:"get kuisoner qchat10 Berhasil",data:result})
})

router.post('/postLogin',async(req,res)=>{
    loginController(req,res);
})

export default router;