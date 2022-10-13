import { InverseMatriceTailleN } from "./InverseMat.js";
import { ProduitMatriceVect } from "./produitsMatriceCarre.js";
import moutMatrice from "./mountMatrice.js";
import transformFloatToInteger from "./transformFloatToInteger.js";

/**
 *
 * @param {Array} tabinputObject
 */
export default function solutionSysteme(tabinputObject) {
  let solutionMessage = "";
  const param = moutMatrice(tabinputObject);
  //console.log("Vecteur");
  //console.table(param.vect);
  //console.log("Matrice");
  //console.table(param.Mat);

  console.log("Inverse");
  const Mat = InverseMatriceTailleN(param.Mat);
  //console.table(Mat);
  console.log("===========================================================");
  console.table(Mat);
  console.log("===========================================================");
  //console.log("T==", transformFloatToInteger(12));

  if (typeof Mat == "object") {
    //console.log(Mat.length, param.vect.length);
    let X = ProduitMatriceVect(Mat, param.vect);
    X = X.map((x, ind) => {
      console.log(ind, "==ind");
      return transformFloatToInteger(x);
    });
    console.log("vvvvvvvvvvvvvvvvvvvvvvvv");
    console.table(X);
    solutionMessage = "{ (";

    for (const i in X) {
      if (X[i].deno == 1) {
        if (i == 0) solutionMessage += ` ${X[i].nume} `;
        else solutionMessage += `, ${X[i].nume} `;
      } else {
        if (i == 0) solutionMessage += ` ${X[i].nume}/${X[i].deno}`;
        else solutionMessage += `, ${X[i].nume}/${X[i].deno} `;
      }
    }

    solutionMessage += ") }";
  } else {
    let tabBool = [];
    for (let i = 0; i < param.Mat.length; i++) {
      //for(let k = 0; k < param.Mat.length; k++)
      const val = param.Mat[0][i];
      let bool;
      for (let j = 1; j < param.Mat.length; j++) {
        if (val % param.Mat[j][i] == 0 || param.Mat[j][i] % val == 0) {
          console.log("voila", val, param.Mat[j][i]);
          bool = true;
        } else {
          bool = false;
        }
      }
      tabBool.push(bool);
    }

    if (tabBool.every((a) => a == true)) {
      solutionMessage = "Infinite de solution";
    } else {
      solutionMessage = Mat;
      solutionMessage += `:Ce systeme n'a pas de solution\n`;
    }
  }
  return solutionMessage;
}
