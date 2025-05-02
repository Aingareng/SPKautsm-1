import pool from "../config/database.js";

export async function insertResultPasien(data) {
  const {
    pasienId,
    a1, a2, a3, a4, a5, a6, a7, a8, a9, a10,
    asdPresentasi, // Probabilitas posterior YES
    nonAsdPresentasi, // Probabilitas posterior NO
  } = data;

  // Konversi YES/NO ke 1/0 untuk A1-A10
  const answers = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10].map(answer =>
    answer.toUpperCase() === "YES" ? 1 : 0
  );

  // Ambil tanggal saat ini
  const currentDate = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

  try {
    const query = `
      INSERT INTO pasien_results 
      (pasien_id, A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, asd_presentasi, nonAsd_presentasi, Tanggal_periksa)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      pasienId,
      ...answers, // A1-A10 (1 atau 0)
      asdPresentasi,
      nonAsdPresentasi,
      currentDate
    ];

    const [result] = await pool.query(query, values);
    console.log("Data pasien berhasil dimasukkan ke database.");
    return {
      success: true,
      data: {
        id: result.insertId,
        pasienId,
        a1: answers[0],
        a2: answers[1],
        a3: answers[2],
        a4: answers[3],
        a5: answers[4],
        a6: answers[5],
        a7: answers[6],
        a8: answers[7],
        a9: answers[8],
        a10: answers[9],
        asdPresentasi,
        nonAsdPresentasi,
        Tanggal_periksa: currentDate
      }
    };
  } catch (error) {
    console.error("Error saat insert data pasien:", error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function getPatientResult(pasienId) {
  try {
    const query = `
      SELECT 
        pasien_id, 
        A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, 
        asd_presentasi, 
        nonAsd_presentasi, 
        Tanggal_periksa 
      FROM pasien_results 
      WHERE pasien_id = ?
    `;
    const [rows] = await pool.query(query, [pasienId]);

    if (rows.length === 0) {
      return null; // Tidak ada data untuk pasien ini
    }

    // Konversi A1-A10 dari 1/0 ke YES/NO untuk respons
    const result = rows[0];
    const answers = {};
    for (let i = 1; i <= 10; i++) {
      answers[`a${i}`] = result[`A${i}`] === 1 ? "YES" : "NO";
    }

    return {
      pasienId: result.pasien_id,
      answers,
      asdPresentasi: result.asd_presentasi,
      nonAsdPresentasi: result.nonAsd_presentasi,
      tanggalPeriksa: result.Tanggal_periksa,
    };
  } catch (error) {
    console.error("Error saat mengambil data pasien:", error);
    throw new Error("Failed to fetch patient result");
  }
}