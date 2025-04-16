import pool from '../config/database.js'

export async function loginModels(email,pass) {
    try{
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?',[email,pass]
        );
        return rows[0]
    }
    catch(error){
        console.error('Error fetching user:', error);
    }
}