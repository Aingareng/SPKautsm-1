import express from "express"
import { kuisonerControllers } from "../controller/kuisonerController.js";
import { loginController } from "../controller/loginController.js";
import { insertControllerPasien } from "../controller/pasienInsertController.js";
import { kalkulasiNaiveByaesPasien } from "../controller/naiveByaesInsert.js";
// import { probalitasPrior } from "../controller/naiveBayesControler.js";

const router = express.Router();


router.get('/getQchat10', async(req,res)=>{
    const result = await kuisonerControllers(req,res)
    res.status(200).json({message:"get kuisoner qchat10 Berhasil",data:result})
})

router.post('/postLogin',async(req,res)=>{
    loginController(req,res);
})

router.post('/postPasien',async(req,res)=>{
    insertControllerPasien(req,res);
})

router.post('/insertKuisoner',async(req,res)=>{
    kalkulasiNaiveByaesPasien(req,res);
})



export default router;