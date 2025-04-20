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

export const dataYesClassYes = async ()=>{
    const [rows] = await pool.query(`
        SELECT 
            SUM(A1 = 1 AND class = 'YES') AS totalYES_A1_terhadap_ClassYES,
            SUM(A2 = 1 AND class = 'YES') AS totalYES_A2_terhadap_ClassYES,
            SUM(A3 = 1 AND class = 'YES') AS totalYES_A3_terhadap_ClassYES,
            SUM(A4 = 1 AND class = 'YES') AS totalYES_A4_terhadap_ClassYES,
            SUM(A5 = 1 AND class = 'YES') AS totalYES_A5_terhadap_ClassYES,
            SUM(A6 = 1 AND class = 'YES') AS totalYES_A6_terhadap_ClassYES,
            SUM(A7 = 1 AND class = 'YES') AS totalYES_A7_terhadap_ClassYES,
            SUM(A8 = 1 AND class = 'YES') AS totalYES_A8_terhadap_ClassYES,
            SUM(A9 = 1 AND class = 'YES') AS totalYES_A9_terhadap_ClassYES,
            SUM(A10 = 1 AND class = 'YES') AS totalYES_A10_terhadap_ClassYES
        FROM autismscreeningdata;
    `)
    return rows[0]
}


export const dataNoClassYes = async () =>{
    const [rows] = await pool.query(`
    SELECT 
        SUM(A1 = 0 AND class = 'YES') AS totalNO_A1_terhadap_ClassYES,
        SUM(A2 = 0 AND class = 'YES') AS totalNO_A2_terhadap_ClassYES,
        SUM(A3 = 0 AND class = 'YES') AS totalNO_A3_terhadap_ClassYES,
        SUM(A4 = 0 AND class = 'YES') AS totalNO_A4_terhadap_ClassYES,
        SUM(A5 = 0 AND class = 'YES') AS totalNO_A5_terhadap_ClassYES,
        SUM(A6 = 0 AND class = 'YES') AS totalNO_A6_terhadap_ClassYES,
        SUM(A7 = 0 AND class = 'YES') AS totalNO_A7_terhadap_ClassYES,
        SUM(A8 = 0 AND class = 'YES') AS totalNO_A8_terhadap_ClassYES,
        SUM(A9 = 0 AND class = 'YES') AS totalNO_A9_terhadap_ClassYES,
        SUM(A10 = 0 AND class = 'YES') AS totalNO_A10_terhadap_ClassYES
    FROM autismscreeningdata;
    `);
    return rows[0]
}

export const dataYesClassNo = async ()=>{
    const [rows] = await pool.query(`
        SELECT 
            SUM(A1 = 1 AND class = 'NO') AS totalYES_A1_terhadap_ClassNo,
            SUM(A2 = 1 AND class = 'NO') AS totalYES_A2_terhadap_ClassNo,
            SUM(A3 = 1 AND class = 'NO') AS totalYES_A3_terhadap_ClassNo,
            SUM(A4 = 1 AND class = 'NO') AS totalYES_A4_terhadap_ClassNo,
            SUM(A5 = 1 AND class = 'NO') AS totalYES_A5_terhadap_ClassNo,
            SUM(A6 = 1 AND class = 'NO') AS totalYES_A6_terhadap_ClassNo,
            SUM(A7 = 1 AND class = 'NO') AS totalYES_A7_terhadap_ClassNo,
            SUM(A8 = 1 AND class = 'NO') AS totalYES_A8_terhadap_ClassNo,
            SUM(A9 = 1 AND class = 'NO') AS totalYES_A9_terhadap_ClassNo,
            SUM(A10 = 1 AND class = 'NO') AS totalYES_A10_terhadap_ClassNo
        FROM autismscreeningdata;
    `)
    return rows[0]
}

export const dataNoClassNo = async ()=>{
    const [rows] = await pool.query(`
        SELECT 
            SUM(A1 = 0 AND class = 'NO') AS totalNo_A1_terhadap_ClassNo,
            SUM(A2 = 0 AND class = 'NO') AS totalNo_A2_terhadap_ClassNo,
            SUM(A3 = 0 AND class = 'NO') AS totalNo_A3_terhadap_ClassNo,
            SUM(A4 = 0 AND class = 'NO') AS totalNo_A4_terhadap_ClassNo,
            SUM(A5 = 0 AND class = 'NO') AS totalNo_A5_terhadap_ClassNo,
            SUM(A6 = 0 AND class = 'NO') AS totalNo_A6_terhadap_ClassNo,
            SUM(A7 = 0 AND class = 'NO') AS totalNo_A7_terhadap_ClassNo,
            SUM(A8 = 0 AND class = 'NO') AS totalNo_A8_terhadap_ClassNo,
            SUM(A9 = 0 AND class = 'NO') AS totalNo_A9_terhadap_ClassNo,
            SUM(A10 = 0 AND class = 'NO') AS totalNo_A10_terhadap_ClassNo
        FROM autismscreeningdata;
    `)
    return rows[0]
}