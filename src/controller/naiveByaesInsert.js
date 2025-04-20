import { probalitasPrior, likelihood } from './naiveBayesControler.js';
import { insertResultPasien } from '../models/pasienResultsModels.js';

export async function kalkulasiNaiveByaesPasien(req, res) {
  try {
    const inputPasien = req.body;

  
    for (let i = 1; i <= 10; i++) {
      const key = `A${i}`;
      if (!inputPasien[key]) {
        return res.status(400).json({ message: `Jawaban untuk ${key} tidak ditemukan.` });
      }
    }

    const { likelihoodYesAsdYes, likelihoodNoAsdYes, likelihoodYesAsdNo, likelihoodNoAsdNo } = await likelihood();
    const { asdYESPrior, asdNoPrior } = await probalitasPrior();

    let logYes = Math.log(asdYESPrior);
    let logNo = Math.log(asdNoPrior);

    for (let i = 1; i <= 10; i++) {
      const key = `A${i}`;
      const jawaban = inputPasien[key].toUpperCase();

      if (jawaban === 'YES') {
        logYes += Math.log(likelihoodYesAsdYes[key]);
        logNo  += Math.log(likelihoodYesAsdNo[key]);
      } else {
        logYes += Math.log(likelihoodNoAsdYes[key]);
        logNo  += Math.log(likelihoodNoAsdNo[key]);
      }
    }

    const posteriorYES = Math.exp(logYes);
    const posteriorNO  = Math.exp(logNo);
    const hasilKlasifikasi = posteriorYES > posteriorNO ? 'YES' : 'NO';

 
    await insertResultPasien({
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
      postrior: Math.max(posteriorYES, posteriorNO),
      hasil: hasilKlasifikasi
    });

    res.status(200).json({
      message: "Klasifikasi berhasil dan data pasien tersimpan.",
      hasil: hasilKlasifikasi,
      posterior: {
        YES: posteriorYES,
        NO: posteriorNO
      }
    });
  } catch (error) {
    console.error("Error dalam kalkulasi Naive Bayes:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
}
