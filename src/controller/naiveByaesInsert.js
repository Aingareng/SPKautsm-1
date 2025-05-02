import { calculatePriorAndLikelihood } from "./naiveBayesControler.js";
import { insertResultPasien } from "../models/pasienResultsModels.js";

export async function calculateNaiveBayesForPatient(req, res) {
  try {
    const inputPasien = req.body;

    // Validasi input
    if (!inputPasien.idUser || typeof inputPasien.idUser !== "string") {
      return res.status(400).json({
        status: 400,
        message: "ID User tidak valid",
        data: null,
      });
    }

    const answers = {};
    const missingAnswers = [];
    for (let i = 1; i <= 10; i++) {
      const key = `A${i}`;
      const answer = inputPasien[key]?.toUpperCase();
      if (!["YES", "NO"].includes(answer)) {
        missingAnswers.push(key);
      } else {
        answers[key] = answer;
      }
    }

    if (missingAnswers.length > 0) {
      console.log("Missing or invalid answers:", missingAnswers);
      return res.status(400).json({
        status: 400,
        message: `Jawaban tidak valid untuk ${missingAnswers.join(", ")}`,
        data: null,
      });
    }

    // Ambil prior dan likelihood
    const {
      asdYESPrior,
      asdNoPrior,
      likelihoodYesAsdYes,
      likelihoodNoAsdYes,
      likelihoodYesAsdNo,
      likelihoodNoAsdNo,
    } = await calculatePriorAndLikelihood();

    // Hitung log posterior
    let logYes = Math.log(asdYESPrior);
    let logNo = Math.log(asdNoPrior);

    for (let i = 1; i <= 10; i++) {
      const key = `A${i}`;
      const isYes = answers[key] === "YES";
      logYes += Math.log(isYes ? likelihoodYesAsdYes[key] : likelihoodNoAsdYes[key]);
      logNo += Math.log(isYes ? likelihoodYesAsdNo[key] : likelihoodNoAsdNo[key]);
    }

    // Hitung posterior dan normalisasi
    const posteriorYES = Math.exp(logYes);
    const posteriorNO = Math.exp(logNo);
    const totalPosterior = posteriorYES + posteriorNO;
    const normalizedYES = posteriorYES / totalPosterior; // Untuk asd_presentasi
    const normalizedNO = posteriorNO / totalPosterior; // Untuk nonAsd_presentasi

    const hasilKlasifikasi = normalizedYES > normalizedNO ? "YES" : "NO";

    // Simpan hasil ke database
    const saveResult = await insertResultPasien({
      pasienId: inputPasien.idUser, // Ganti idUser menjadi pasienId
      a1: answers.A1,
      a2: answers.A2,
      a3: answers.A3,
      a4: answers.A4,
      a5: answers.A5,
      a6: answers.A6,
      a7: answers.A7,
      a8: answers.A8,
      a9: answers.A9,
      a10: answers.A10,
      asdPresentasi: normalizedYES, // Simpan probabilitas YES
      nonAsdPresentasi: normalizedNO, // Simpan probabilitas NO
    });

    if (!saveResult.success) {
      return res.status(500).json({
        status: 500,
        message: `Gagal menyimpan hasil klasifikasi: ${saveResult.error || "Unknown error"}`,
        data: null,
      });
    }

    // Kirim respons
    return res.status(200).json({
      status: 200,
      message: "Klasifikasi berhasil dilakukan",
      data: {
        hasil: hasilKlasifikasi,
        asdPresentasi: normalizedYES.toFixed(4),
        nonAsdPresentasi: normalizedNO.toFixed(4),
        savedData: saveResult.data,
      },
    });
  } catch (error) {
    console.error("Error in Naive Bayes calculation:", error);
    return res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan server dalam proses klasifikasi",
      data: null,
    });
  }
}