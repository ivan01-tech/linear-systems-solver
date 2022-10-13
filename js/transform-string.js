/**
 * Fonction pour transformer une chaine provenant d'un input en un objet traitable du systeme
 * @param {Object} inputObject
 */

function transformString(inputObject) {
  let string = inputObject.string + "";
  inputObject["constante"] = "";

  let tab = []; // tableau qui contiendra les objets ( coef et valeurs )
  let param = "";
  let coef = "";
  //  let signe = "";
  let obj = {};
  let constante;

  /**
   * @param {Object} object
   */
  function beforePushing(object) {
    for (const key in object) {
      if (key != "signe" && key != "afterEqual") {
        if (!object[key]) {
          object[key] = 1;
        }
        object[key] = eval(object[key]);

        if (object.signe == "-") {
          object[key] = object[key] * -1;
        } else {
          object.signe = "+";
        }
      }
    }
  }

  for (let i = 0; i < string.length; i++) {
    if (obj.afterEqual == true) {
      inputObject.constante = string.slice(i);
      //console.log(inputObject.constante, "sdv");
      break;
    }

    if (/[\d\.\/]/.test(string[i])) {
      coef += string[i];
      //console.log(coef, { ...obj });
    } else if (/[a-zA-Z]/.test(string[i])) {
      param += string[i];
    } else if (/[-+]/.test(string[i])) {
      if (i > 0) {
        obj[param] = coef;
        beforePushing(obj);
        tab.push({ ...obj });

        param = "";
        coef = "";
        obj = {};
        obj["signe"] = string[i];
      } else {
        obj["signe"] = string[i];
      }
    } else if (/=/.test(string[i])) {
      obj[param] = coef;
      beforePushing(obj);
      tab.push({ ...obj }); // avant de push dans le tableau
      console.log({ ...obj });
      param = "";
      coef = "";
      obj = {};
      obj["afterEqual"] = true;
    }
  }

  //console.table(tab);
  inputObject["table"] = tab;
  console.log("out put", inputObject);
}

export default transformString;
