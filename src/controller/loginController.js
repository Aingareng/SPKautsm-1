import { loginModels } from "../models/modelsLogin.js";

export async function loginController(req,res) {
    const {email,pass} =req.body
    try{
        const user = await loginModels(email,pass)
        if(user){
            if(user.email !== email && user.pass !== password){
                console.log("Password & Username tidak sesuai")
                res.status(401).json({message:"Password & Username tidak sesuai"});
            }
        }else{
            res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"Login success",data:user});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}