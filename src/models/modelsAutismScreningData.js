import pool from "../config/database.js";

export const dataClass = async ()=>{
    const [rows] = await pool.query(`
    SELECT 
        COUNT(*) AS total_data,
        SUM(class = 'YES') AS total_yes,
        SUM(class = 'NO') AS total_no
        FROM autismscreeningdata
    `);
    return rows[0]
};

export const dataYesClass = async ()=>{
    const [rows] = await pool.query(`
        SELECT 
            SUM(A1 = 1 AND class = 'YES') AS totalYES_A1_terhadap_Class,
            SUM(A2 = 1 AND class = 'YES') AS totalYES_A2_terhadap_Class,
            SUM(A3 = 1 AND class = 'YES') AS totalYES_A3_terhadap_Class,
            SUM(A4 = 1 AND class = 'YES') AS totalYES_A4_terhadap_Class,
            SUM(A5 = 1 AND class = 'YES') AS totalYES_A5_terhadap_Class,
            SUM(A6 = 1 AND class = 'YES') AS totalYES_A6_terhadap_Class,
            SUM(A7 = 1 AND class = 'YES') AS totalYES_A7_terhadap_Class,
            SUM(A8 = 1 AND class = 'YES') AS totalYES_A8_terhadap_Class,
            SUM(A9 = 1 AND class = 'YES') AS totalYES_A9_terhadap_Class,
            SUM(A10 = 1 AND class = 'YES') AS totalYES_A10_terhadap_Class
        FROM autismscreeningdata;
    `)
    return rows[0]
}

export const dataNoClass = async () =>{
    const [rows] = await pool.query(`
    SELECT 
        SUM(A1 = 1 AND class = 'NO') AS totalNO_A1_terhadap_Class,
        SUM(A2 = 1 AND class = 'NO') AS totalNO_A2_terhadap_Class,
        SUM(A3 = 1 AND class = 'NO') AS totalNO_A3_terhadap_Class,
        SUM(A4 = 1 AND class = 'NO') AS totalNO_A4_terhadap_Class,
        SUM(A5 = 1 AND class = 'NO') AS totalNO_A5_terhadap_Class,
        SUM(A6 = 1 AND class = 'NO') AS totalNO_A6_terhadap_Class,
        SUM(A7 = 1 AND class = 'NO') AS totalNO_A7_terhadap_Class,
        SUM(A8 = 1 AND class = 'NO') AS totalNO_A8_terhadap_Class,
        SUM(A9 = 1 AND class = 'NO') AS totalNO_A9_terhadap_Class,
        SUM(A10 = 1 AND class = 'NO') AS totalNO_A10_terhadap_Class
    FROM autismscreeningdata;
    `);
    return rows[0]
}