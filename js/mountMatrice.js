/**
 * @param {Array of Object} inputObject
 * @returns Obejct Of Table
 */

export default function moutMatrice(inputObject) {
  /*verification des differents variables dans l'object sinon on defini leurs valeurs par defaut a 0**/
  /**************************************** */
  let tabVar = [];
  //inputObject.forEach(function (elt, index) {
  //let variables = [];
  inputObject[0].table.forEach(function (coef) {
    const keyCoef = Object.keys(coef);
    keyCoef.forEach(function (key) {
      if (key != "signe" && key != "afterEqaul") {
        tabVar.push(key);
      }
    });
  });

  //tabVar.push(variables);
  //});
  console.log("tabVar");
  console.table(tabVar);

  /***---------------------------------------------------------- */
  console.log("commence------------------------");
  let var1 = [];
  for (let i = 1; i < inputObject.length; i++) {
    var1 = [];

    inputObject[i].table.forEach(function (coef) {
      const keyCoef = Object.keys(coef);
      keyCoef.forEach(function (key) {
        if (key != "signe" && key != "afterEqaul") {
          var1.push(key);
        }
      });
    });

    console.log(tabVar);
    console.log(i, "var------------------------");
    console.log(var1);

    inputObject[i].table.forEach(function (coef, indice) {
      const keyCoef = Object.keys(coef);
      tabVar.forEach(function (key, ind) {
        if (!keyCoef.includes(key)) {
          if (!var1.includes(key)) {
            //inputObject[i].table.push({ [key]: 0 });

            inputObject[i].table.splice(ind, 0, { [key]: 0 });
            //var1.splice(ind,0,key);
            var1.push(key);
            console.log(key, "ajouter", ind);
          }
        }
      });
    });
  }
  //console.log("var",var1);
  console.log("commence------------------------");
  /*--------------------------------------------------------*/
  console.table(inputObject.table);
  console.table(inputObject);
  let M = [];
  let constante = [];
  inputObject.forEach(function (elt, index) {
    let tab = [];

    constante.push(eval(elt.constante));

    elt.table.forEach(function (coef) {
      const keyCoef = Object.keys(coef);
      keyCoef.forEach(function (key) {
        if (key != "signe" && key != "afterEqaul") {
          tab.push(parseFloat(coef[key]));
        }
      });
    });
    M.push(tab);
  });
  console.log("coef");
  console.table(M);
  console.table(constante);

  return {
    Mat: M,
    vect: constante,
  };
}
