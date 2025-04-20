import { dataClass,dataYesClassYes,dataNoClassYes,dataYesClassNo,dataNoClassNo } from "../models/modelsAutismScreningData.js";

 
export async function probalitasPrior(req,res) {
    const [dataClassTotal] = await Promise.all([dataClass()])
    
    const asdYESPrior =(dataClassTotal.total_yes / dataClassTotal.total_data).toFixed(2);
    const asdNoPrior = (dataClassTotal.total_no / dataClassTotal.total_data).toFixed(2);



    console.log("total data:", dataClassTotal.total_data)
    console.log("total data Yes:",dataClassTotal.total_yes,"total data No:",dataClassTotal.total_no,)
    console.log("prior Yes:",asdYESPrior,"prior No:",asdNoPrior);
    return {asdNoPrior,asdYESPrior};

}

export async function likelihood() {
    const [dataClassTotal, likelihoodYesClassYES, likelihoodNoClassYes,likelihoodNoClassNo,likelihoodYesClassNo] = await Promise.all([
      dataClass(),
      dataYesClassYes(),
      dataNoClassYes(),
      dataNoClassNo(),
      dataYesClassNo()
      
    ]);
  
    const totalYes = dataClassTotal.total_yes;
    const totalNo = dataClassTotal.total_no;
  
    const likelihoodYesAsdYes = {};
    const likelihoodNoAsdYes={};
    const likelihoodYesAsdNo={};
    const likelihoodNoAsdNo ={};
    
    for (let i = 1; i <= 10; i++) {
      const keyYes = `totalYES_A${i}_terhadap_ClassYES`;
      const keyNo = `totalNO_A${i}_terhadap_ClassYES`;
      const valueYes = likelihoodYesClassYES[keyYes];
      const valueNo = likelihoodNoClassYes[keyNo]
      const likelihoodYesAsdYesresults = (valueYes / totalYes);
      const likelihoodAsdNoAsdYesresults = (valueNo/totalYes);
      likelihoodYesAsdYes[`A${i}`] = likelihoodYesAsdYesresults;
      likelihoodNoAsdYes[`A${i}`] = likelihoodAsdNoAsdYesresults;
      // console.log(valueNo)
    }
    // console.log("likelihoodAsdNo:");
    
    for (let i = 1; i <= 10; i++) {
        const keyYes = `totalYES_A${i}_terhadap_ClassNo`;
        const keyNo = `totalNo_A${i}_terhadap_ClassNo`
        const valueNo = likelihoodNoClassNo[keyNo]
        const valueYes = likelihoodYesClassNo[keyYes]
        const likelihoodYesClassNoresult = (valueYes / totalNo)
        const likelihoodNoAsdNoHasil = (valueNo / totalNo);
        likelihoodYesAsdNo[`A${i}`] = likelihoodYesClassNoresult;
        likelihoodNoAsdNo[`A${i}`]=likelihoodNoAsdNoHasil;
        // console.log(valueNo);
      }

    return {likelihoodYesAsdYes,likelihoodYesAsdNo,likelihoodNoAsdNo,likelihoodNoAsdYes};
}

export async function probalitasPostrior() {
    // Ambil semua nilai likelihood dan prior
    const { likelihoodYesAsdYes,likelihoodYesAsdNo,likelihoodNoAsdNo,likelihoodNoAsdYes } = await likelihood();
    const { asdYESPrior, asdNoPrior } = await probalitasPrior();
  
    // Inisialisasi hasil perkalian
    let panjangYesAsdYes = 1;
    let panjangNoAsdYes = 1;
    let panjangYesAsdNo = 1;
    let panjangNoAsdNo = 1;

    for (let i = 1; i <= 10; i++) {
      const key = `A${i}`;
      panjangYesAsdYes += Math.log(parseFloat(likelihoodYesAsdYes[key]));
      panjangNoAsdYes  += Math.log(parseFloat(likelihoodNoAsdYes[key]));
      panjangYesAsdNo  += Math.log(parseFloat(likelihoodYesAsdNo[key]));
      panjangNoAsdNo   += Math.log(parseFloat(likelihoodNoAsdNo[key]));

    }
  
    const posteriorYesAsdYes = Math.exp(panjangYesAsdYes + Math.log(asdYESPrior));
    const posteriorNoAsdYes  = Math.exp(panjangNoAsdYes + Math.log(asdYESPrior));
    const posteriorYesAsdNo  = Math.exp(panjangYesAsdNo + Math.log(asdNoPrior));
    const posteriorNoAsdNo   = Math.exp(panjangNoAsdNo + Math.log(asdNoPrior));

    console.log("posterior (1|YES):",posteriorYesAsdYes)
    console.log("posteriror (0|YES):",posteriorNoAsdYes)
    console.log("Postrior (1|NO):",posteriorYesAsdNo)
    console.log("Postrior (0|No):",posteriorNoAsdNo)

    return { posteriorYesAsdYes,
      posteriorNoAsdYes, 
      posteriorYesAsdNo, 
      posteriorNoAsdNo  };
  }