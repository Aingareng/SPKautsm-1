import { dataClass,dataYesClass,dataNoClass } from "../models/modelsAutismScreningData.js";


export async function probalitasPrior() {
    const [dataClassTotal] = await Promise.all([dataClass()])
    
    const asdYESPrior = dataClassTotal.total_yes / dataClassTotal.total_data;
    const asdNoPrior = dataClassTotal.total_no / dataClassTotal.total_data;

    return {asdNoPrior,asdYESPrior};
}

export async function likelihood() {
    const [dataClassTotal, totalYesClass, totalNoClass] = await Promise.all([
      dataClass(),
      dataYesClass(),
      dataNoClass()
    ]);
  
    const totalYes = dataClassTotal.total_yes;
    const totalNo = dataClassTotal.total_no;
  
    const likelihoodYes = {};
    const likelihoodNo={}
  
    for (let i = 1; i <= 10; i++) {
      const key = `totalYES_A${i}_terhadap_Class`;
      const value = totalYesClass[key] 
      const likelihoodYesHasil = value / totalYes;
      likelihoodYes[`A${i}`]=likelihoodYesHasil;
    }

    for (let i = 1; i <= 10; i++) {
        const key = `totalNO_A${i}_terhadap_Class`;
        const value = totalNoClass[key] 
        const likelihoodNoHasil = value / totalNo;
        likelihoodNo[`A${i}`]=likelihoodNoHasil;
      }
    // console.log(totalYes);
    // console.log(totalYesClass);
    // console.log(likelihoodYes);
    return {likelihoodYes,likelihoodNo};
}

export async function probalitasPostrior() {
    // Ambil semua nilai likelihood dan prior
    const { likelihoodYes, likelihoodNo } = await likelihood();
    const { asdYESPrior, asdNoPrior } = await probalitasPrior();
  
    // Inisialisasi hasil perkalian
    let panjangYesA = 1;
    let panjangNoA = 1;
  
    for (let i = 1; i <= 10; i++) {
      const key = `A${i}`;
      panjangYesA *= likelihoodYes[key];
      panjangNoA  *= likelihoodNo[key];
    }
  
    const posteriorYes = panjangYesA * asdYESPrior;
    const posteriorNo = panjangNoA * asdNoPrior;
  
    console.log('panjangYesA:', panjangYesA);
    console.log('posteriorYes:', posteriorYes);
  
    return { posteriorYes, posteriorNo };
  }