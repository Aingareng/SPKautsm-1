import { probalitasPrior, likelihood } from './naiveBayesControler.js';
import { insertResultPasien } from '../models/pasienResultsModels.js';

export async function kalkulasiNaiveByaesPasien(req, res) {
  try {
    const inputPasien = req.body;

  
    if (!inputPasien.idUser) {
      return res.status(400).json({
        status: 400,
        message: 'ID User tidak ditemukan',
        data: null
      });
    }

  
    const missingAnswers = [];
    for (let i = 1; i <= 10; i++) {
      const key = `A${i}`;
      if (!inputPasien[key]) {
        missingAnswers.push(key);
      }
    }

    if (missingAnswers.length > 0) {
      return res.status(400).json({
        status: 400,
        message: `Jawaban untuk ${missingAnswers.join(', ')} tidak ditemukan`,
        data: null
      });
    }

    
    const { 
      likelihoodYesAsdYes, 
      likelihoodNoAsdYes, 
      likelihoodYesAsdNo, 
      likelihoodNoAsdNo 
    } = await likelihood();
    
    const { asdYESPrior, asdNoPrior } = await probalitasPrior();

    
    let logYes = Math.log(asdYESPrior);
    let logNo = Math.log(asdNoPrior);

    for (let i = 1; i <= 10; i++) {
      const key = `A${i}`;
      const jawaban = inputPasien[key].toUpperCase();

      if (jawaban === 'YES') {
        logYes += Math.log(likelihoodYesAsdYes[key]);
        logNo += Math.log(likelihoodYesAsdNo[key]);
      } else {
        logYes += Math.log(likelihoodNoAsdYes[key]);
        logNo += Math.log(likelihoodNoAsdNo[key]);
      }
    }

    
    const posteriorYES = Math.exp(logYes);
    const posteriorNO = Math.exp(logNo);
    const hasilKlasifikasi = posteriorYES > posteriorNO ? 'YES' : 'NO';
    const confidence = Math.max(posteriorYES, posteriorNO);

    
    const saveResult = await insertResultPasien({
      idUser: inputPasien.idUser,
      a1: inputPasien.A1,
      a2: inputPasien.A2,
      a3: inputPasien.A3,
      a4: inputPasien.A4,
      a5: inputPasien.A5,
      a6: inputPasien.A6,
      a7: inputPasien.A7,
      a8: inputPasien.A8,
      a9: inputPasien.A9,
      a10: inputPasien.A10,
      postrior: confidence,
      hasil: hasilKlasifikasi
    });

    if (!saveResult || !saveResult.success) {
      return res.status(500).json({
        status: 500,
        message: 'Gagal menyimpan hasil klasifikasi',
        data: null
      });
    }

    
    return res.status(200).json({
      status: 200,
      message: 'Klasifikasi berhasil dilakukan',
      data: {
        hasil: hasilKlasifikasi,
        confidence: confidence,
        details: {
          posteriorYES: posteriorYES,
          posteriorNO: posteriorNO
        },
        savedData: saveResult.data
      }
    });

  } catch (error) {
    console.error("Error dalam kalkulasi Naive Bayes:", error);
    return res.status(500).json({
      status: 500,
      message: 'Terjadi kesalahan server dalam proses klasifikasi',
      data: null
    });
  }
}