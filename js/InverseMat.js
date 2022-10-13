import determinantMatriceTailleN, {
  determinant2,
} from "./DeterminantMatriceN.js";
/******************************************************** */
/**
 *
 * @param {Array of arrays} tab
 * @returns {Arrays}
 */
export function InverseMatriceTailleN(tab) {
  // Inverse d'une matrice de dim compris
  // entre 2 et 10
  let det;

  let Inv = [];
  let coef = 0;

  for (let i = 0; i < tab.length; i++) {
    let Ligne = [];

    for (let j = 0; j < tab[i].length; j++) {
      coef = Math.pow(-1, i + j);
      // determination de la matrice reduite
      let M = [];
      for (let a = 0; a < tab.length; a++) {
        if (a !== i) {
          let m = [];
          for (let b = 0; b < tab[a].length; b++) {
            if (b != j) {
              m.push(parseFloat(tab[a][b]));
            }
          }
          M.push(m);
        }
      }

      // Calcul du determinant de la matrice reduite obtenu
      if (tab.length == 2) {
        Ligne.push(coef * M[0][0]);
        det = parseFloat(determinant2(tab));
      } else {
        det = parseFloat(determinantMatriceTailleN(tab));

        if (M.length == 2) Ligne.push(parseFloat(coef * determinant2(M)));
        else {
          Ligne.push(parseFloat(coef * determinantMatriceTailleN(M)));
        }
      }
    }
    Inv.push(Ligne); // la ligne est ajoutee aux tableau Inv
  }
  /**
   * on mutiplie chaque element de Inv par le determinat de tab
   * //    return Math.round( element*(1/det) )/1000
   */
  console.log("detN", det);
  console.log("detN", Inv);

  if (det === 0) return "Matrice Non Inversible ";
  // Transformer de Inv
  let trs = [];
  for (let i = 0; i < Inv.length; i++) {
    trs.push([...Inv[i]]);
  }

  for (let i = 0; i < Inv.length; i++) {
    let temp = Inv[i];
    for (let j = 0; j < temp.length; j++) {
      trs[j][i] = temp[j];
    }
  }

  return trs.map((elt) => {
    let pow = Math.pow(10, tab.length);
    return elt.map((e) => Math.round(e * pow * (1 / det)) / pow);
  });
}
