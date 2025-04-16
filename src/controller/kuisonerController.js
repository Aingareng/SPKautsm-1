import { getKuisoner } from "../models/modelsKuisoner.js"

export async function kuisonerControllers(req,res){
    try{
        return await getKuisoner();
    }
    catch(error){
        console.log(error.message);
    }
}