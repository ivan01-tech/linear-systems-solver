/*********************    Determinant d'une matrice de degree egale inferieur a 10 et Inverse      *******************/
/********************** DECLARATION DES FONCTION ****************/
//  Fonction pour calculer le determinant d'une matrice.

export function determinant2(Mat2) {
  return Mat2[0][0] * Mat2[1][1] - Mat2[0][1] * Mat2[1][0];
}

export function determinant7(tab) {
  //   apres le determinant de la M tu calcule les matrice reduite de chanque element
  let det = 0;
  let coef;
  const i = 0;
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

    det += determinant6(M) * Math.pow(-1, i + j) * tab[i][j];
  }
  return det;
}
