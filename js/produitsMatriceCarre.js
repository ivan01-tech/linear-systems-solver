/**
 * Mon fameux constat est que l'element [i][j] de la matrice produit
 * correspond en en fait au produit [i][..] * [..][j]
 * @param {matrice 1} mat1
 * @param {matrice 2} mat2
 * @returns Array
 */

// #111*1#
export function ProduitMatriceCarre(mat1, mat2) {
  let M = [];
  const t1 = mat1.length;
  const t2 = mat2.length;

  // Un tableau qui contiendra les differentes valeur d'une ligne de pro

  if (t1 === t2) {
    for (let i = 0; i < t1; i++) {
      let M1 = [];
      for (let j = 0; j < t1; j++) {
        let m = 0;
        for (let k = 0; k < t1; k++) {
          m += mat1[i][k] * mat2[k][j];
        }
        M1.push(m);
      }
      M.push(M1);
    }
  }
  return M;
}

export function ProduitMatriceVect(mat1, mat2) {
  let M = [];
  const t1 = mat1.length;
  const t2 = mat2.length;

  // Un tableau qui contiendra les differentes valeurs d'une ligne de pro
  console.log(t1, t2);
  if (t1 === t2) {
    let m = 0;
    for (let i = 0; i < t1; i++) {
      m = 0;
      for (let j = 0; j < t1; j++) {
        m += mat1[i][j] * mat2[j];
      }
      console.log(m, " == m");
      M.push(m);
    }
  } else {
    return "Operation impossible.";
  }
  console.log(M);
  return M;
}
