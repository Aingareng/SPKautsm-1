import { getPatientResult } from "../models/pasienResultsModels.js";
import { calculatePriorAndLikelihood } from "./naiveBayesControler.js";

export async function getNaiveBayesResult(req, res) {
  try {
    const { pasienId } = req.params;

    // Validasi pasienId
    if (!pasienId || typeof pasienId !== "string") {
      return res.status(400).json({
        status: 400,
        message: "ID Pasien tidak valid",
        data: null,
      });
    }

    // Ambil data pasien dari database
    const patientData = await getPatientResult(pasienId);
    if (!patientData) {
      return res.status(404).json({
        status: 404,
        message: "Data pasien tidak ditemukan",
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

    // Hitung ulang log posterior berdasarkan jawaban pasien
    let logYes = Math.log(asdYESPrior);
    let logNo = Math.log(asdNoPrior);
    const logYesComponents = [
      `log(P(YES)) = ${Math.log(asdYESPrior).toFixed(4)}`,
    ];
    const logNoComponents = [`log(P(NO)) = ${Math.log(asdNoPrior).toFixed(4)}`];

    for (let i = 1; i <= 10; i++) {
      const key = `a${i}`;
      const isYes = patientData.answers[key] === "YES";
      const yesLikelihood = isYes
        ? likelihoodYesAsdYes[`A${i}`]
        : likelihoodNoAsdYes[`A${i}`];
      const noLikelihood = isYes
        ? likelihoodYesAsdNo[`A${i}`]
        : likelihoodNoAsdNo[`A${i}`];
      logYes += Math.log(yesLikelihood);
      logNo += Math.log(noLikelihood);
      logYesComponents.push(
        `log(P(${key}=${isYes ? "YES" : "NO"} | YES)) = ${Math.log(
          yesLikelihood
        ).toFixed(4)}`
      );
      logNoComponents.push(
        `log(P(${key}=${isYes ? "YES" : "NO"} | NO)) = ${Math.log(
          noLikelihood
        ).toFixed(4)}`
      );
    }

    // Normalisasi posterior
    const posteriorYES = Math.exp(logYes);
    const posteriorNO = Math.exp(logNo);
    const totalPosterior = posteriorYES + posteriorNO;
    const normalizedYES = posteriorYES / totalPosterior;
    const normalizedNO = posteriorNO / totalPosterior;
    const hasilKlasifikasi = normalizedYES > normalizedNO ? "YES" : "NO";

    // Format likelihood untuk respons
    const likelihoodDetails = {};
    for (let i = 1; i <= 10; i++) {
      likelihoodDetails[`A${i}`] = {
        P_YES_given_YES: parseFloat(likelihoodYesAsdYes[`A${i}`]),
        P_NO_given_YES: parseFloat(likelihoodNoAsdYes[`A${i}`]),
        P_YES_given_NO: parseFloat(likelihoodYesAsdNo[`A${i}`]),
        P_NO_given_NO: parseFloat(likelihoodNoAsdNo[`A${i}`]),
      };
    }

    // Kirim respons
    return res.status(200).json({
      status: 200,
      message: "Hasil klasifikasi berhasil diambil",
      data: {
        patient: {
          pasienId: patientData.pasienId,
          pasienName: patientData.pasienName,
          pasienAge: patientData.pasienAge,
          pasienGender: patientData.pasienSex,
          answers: patientData.answers,
          asdPresentasi: patientData.asdPresentasi.toFixed(4),
          nonAsdPresentasi: patientData.nonAsdPresentasi.toFixed(4),
          tanggalPeriksa: patientData.tanggalPeriksa,
          hasilKlasifikasi,
        },
        calculationDetails: {
          dataset: {
            total: 1054,
            yes: 704,
            no: 350,
            yesPercentage: ((704 / 1054) * 100).toFixed(1) + "%",
            noPercentage: ((350 / 1054) * 100).toFixed(1) + "%",
          },
          prior: {
            P_YES: asdYESPrior.toFixed(4),
            P_NO: asdNoPrior.toFixed(4),
          },
          likelihood: likelihoodDetails,
          logPosterior: {
            YES: {
              total: logYes.toFixed(4),
              components: logYesComponents,
            },
            NO: {
              total: logNo.toFixed(4),
              components: logNoComponents,
            },
          },
          posterior: {
            posteriorYES: normalizedYES.toFixed(4),
            posteriorNO: normalizedNO.toFixed(4),
            normalization: `P(YES) = exp(${logYes.toFixed(
              4
            )}) / (exp(${logYes.toFixed(4)}) + exp(${logNo.toFixed(4)}))`,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error in fetching Naive Bayes result:", error);
    return res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan server dalam mengambil hasil klasifikasi",
      data: null,
    });
  }
}
