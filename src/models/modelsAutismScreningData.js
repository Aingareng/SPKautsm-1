import pool from "../config/database.js";

export const dataClassAndLikelihood = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        COUNT(*) AS total_data,
        SUM(class = 'YES') AS total_yes,
        SUM(class = 'NO') AS total_no,
        SUM(A1 = 1 AND class = 'YES') AS totalYES_A1_ClassYES,
        SUM(A2 = 1 AND class = 'YES') AS totalYES_A2_ClassYES,
        SUM(A3 = 1 AND class = 'YES') AS totalYES_A3_ClassYES,
        SUM(A4 = 1 AND class = 'YES') AS totalYES_A4_ClassYES,
        SUM(A5 = 1 AND class = 'YES') AS totalYES_A5_ClassYES,
        SUM(A6 = 1 AND class = 'YES') AS totalYES_A6_ClassYES,
        SUM(A7 = 1 AND class = 'YES') AS totalYES_A7_ClassYES,
        SUM(A8 = 1 AND class = 'YES') AS totalYES_A8_ClassYES,
        SUM(A9 = 1 AND class = 'YES') AS totalYES_A9_ClassYES,
        SUM(A10 = 1 AND class = 'YES') AS totalYES_A10_ClassYES,
        SUM(A1 = 0 AND class = 'YES') AS totalNO_A1_ClassYES,
        SUM(A2 = 0 AND class = 'YES') AS totalNO_A2_ClassYES,
        SUM(A3 = 0 AND class = 'YES') AS totalNO_A3_ClassYES,
        SUM(A4 = 0 AND class = 'YES') AS totalNO_A4_ClassYES,
        SUM(A5 = 0 AND class = 'YES') AS totalNO_A5_ClassYES,
        SUM(A6 = 0 AND class = 'YES') AS totalNO_A6_ClassYES,
        SUM(A7 = 0 AND class = 'YES') AS totalNO_A7_ClassYES,
        SUM(A8 = 0 AND class = 'YES') AS totalNO_A8_ClassYES,
        SUM(A9 = 0 AND class = 'YES') AS totalNO_A9_ClassYES,
        SUM(A10 = 0 AND class = 'YES') AS totalNO_A10_ClassYES,
        SUM(A1 = 1 AND class = 'NO') AS totalYES_A1_ClassNo,
        SUM(A2 = 1 AND class = 'NO') AS totalYES_A2_ClassNo,
        SUM(A3 = 1 AND class = 'NO') AS totalYES_A3_ClassNo,
        SUM(A4 = 1 AND class = 'NO') AS totalYES_A4_ClassNo,
        SUM(A5 = 1 AND class = 'NO') AS totalYES_A5_ClassNo,
        SUM(A6 = 1 AND class = 'NO') AS totalYES_A6_ClassNo,
        SUM(A7 = 1 AND class = 'NO') AS totalYES_A7_ClassNo,
        SUM(A8 = 1 AND class = 'NO') AS totalYES_A8_ClassNo,
        SUM(A9 = 1 AND class = 'NO') AS totalYES_A9_ClassNo,
        SUM(A10 = 1 AND class = 'NO') AS totalYES_A10_ClassNo,
        SUM(A1 = 0 AND class = 'NO') AS totalNO_A1_ClassNo,
        SUM(A2 = 0 AND class = 'NO') AS totalNO_A2_ClassNo,
        SUM(A3 = 0 AND class = 'NO') AS totalNO_A3_ClassNo,
        SUM(A4 = 0 AND class = 'NO') AS totalNO_A4_ClassNo,
        SUM(A5 = 0 AND class = 'NO') AS totalNO_A5_ClassNo,
        SUM(A6 = 0 AND class = 'NO') AS totalNO_A6_ClassNo,
        SUM(A7 = 0 AND class = 'NO') AS totalNO_A7_ClassNo,
        SUM(A8 = 0 AND class = 'NO') AS totalNO_A8_ClassNo,
        SUM(A9 = 0 AND class = 'NO') AS totalNO_A9_ClassNo,
        SUM(A10 = 0 AND class = 'NO') AS totalNO_A10_ClassNo
      FROM autismscreeningdata
    `);
    return rows[0];
  } catch (error) {
    console.error("Error fetching data from database:", error);
    throw new Error("Failed to fetch data for Naive Bayes calculation");
  }
};