// Matrice taille 2
export function determinant2(Mat2) {
  return Mat2[0][0] * Mat2[1][1] - Mat2[0][1] * Mat2[1][0];
}

/**
 * Function pour calculer le determinant d'une matrice de taille N
 * @param {Array of Array} tab
 * @returns Number
 */

function determinantMatriceTailleN(tab) {
  //   apres le determinant de la M tu calcule les matrice reduite de chanque element
  let det = 0;
  let coef;
  const i = 0;
  let Matrice = [];
  for (let j = 0; j < tab.length; j++) {
    let M = [];
    coef = Math.pow(-1, i + j);

    for (let a = 0; a < tab.length; a++) {
      if (a !== i) {
        let m = [];
        for (let b = 0; b < tab.length; b++) {
          if (b !== j) {
            m.push(tab[a][b]);
          }
        }
        M.push(m);
      }
    }
    //det += determinant3(M) * Math.pow(-1, i + j) * tab[i][j];
    Matrice.push({
      table: M,
      constante: Math.pow(-1, i + j) * tab[i][j],
    });
  }

  return Matrice.reduce((det, obj) => {
    if (obj.table.length == 2)
      return det + obj.constante * determinant2(obj.table);
    return det + obj.constante * determinantMatriceTailleN(obj.table);
  }, 0);
}

export default determinantMatriceTailleN;
