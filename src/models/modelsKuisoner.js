import pool from "../config/database.js";

export async function getKuisoner(){
    try{
        const [rows] = await pool.query('SELECT * FROM qchat10')
        return rows;
    }
    catch(error){
        console.error('Error fetching rhk:', error);
        throw error;
    }
}