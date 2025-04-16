import pool from "../config/database.js";

export async function insertResultPasien(data) {
  const {
    idUser,
    a1, a2, a3, a4, a5, a6, a7, a8, a9, a10,
    prior,
    likelihood,
    postrior,
    hasil
  } = data;

  try {
    const query = `
      INSERT INTO pasien_results 
      (id_user, A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, prior, likelihood, postrior, hasil)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      idUser,
      a1, a2, a3, a4, a5, a6, a7, a8, a9, a10,
      prior,
      likelihood,
      postrior,
      hasil
    ];

    await pool.query(query, values);
    console.log("✅ Data pasien berhasil dimasukkan ke database.");
  } catch (error) {
    console.error("❌ Error saat insert data pasien:", error);
  }
}
