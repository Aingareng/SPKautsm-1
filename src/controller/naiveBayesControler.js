import { dataClassAndLikelihood } from "../models/modelsAutismScreningData.js";

export async function calculatePriorAndLikelihood() {
  try {
    const data = await dataClassAndLikelihood();

    // Prior
    const totalData = data.total_data;
    const totalYes = data.total_yes;
    const totalNo = data.total_no;
    const asdYESPrior = (totalYes / totalData);
    const asdNoPrior = (totalNo / totalData);

    // Likelihood dengan Laplace Smoothing
    const likelihoodYesAsdYes = {};
    const likelihoodNoAsdYes = {};
    const likelihoodYesAsdNo = {};
    const likelihoodNoAsdNo = {};

    for (let i = 1; i <= 10; i++) {
      const keyYesClassYes = `totalYES_A${i}_ClassYES`;
      const keyNoClassYes = `totalNO_A${i}_ClassYES`;
      const keyYesClassNo = `totalYES_A${i}_ClassNo`;
      const keyNoClassNo = `totalNO_A${i}_ClassNo`;

      // Laplace Smoothing: (count + 1) / (total + 2)
      likelihoodYesAsdYes[`A${i}`] = ((data[keyYesClassYes] + 1) / (totalYes + 2));
      likelihoodNoAsdYes[`A${i}`] = ((data[keyNoClassYes] + 1) / (totalYes + 2));
      likelihoodYesAsdNo[`A${i}`] = ((data[keyYesClassNo] + 1) / (totalNo + 2));
      likelihoodNoAsdNo[`A${i}`] = ((data[keyNoClassNo] + 1) / (totalNo + 2));
    }

    return {
      asdYESPrior: parseFloat(asdYESPrior),
      asdNoPrior: parseFloat(asdNoPrior),
      likelihoodYesAsdYes,
      likelihoodNoAsdYes,
      likelihoodYesAsdNo,
      likelihoodNoAsdNo,
    };
  } catch (error) {
    console.error("Error calculating prior and likelihood:", error);
    throw new Error("Failed to calculate prior and likelihood");
  }
}