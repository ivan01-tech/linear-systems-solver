import transformString from "./js/transform-string.js";
import solutionSysteme from "./js/calculMatrice.js";

document.addEventListener("DOMContentLoaded", function () {
  let inputs = document.querySelector("#inputs");
  let solutionButton = document.querySelector("#solutionButton");
  let solution = document.querySelector("#solution");

  let myReg = /\d+(\.\d)*[a-z][+-]/g;
  let myRegex = /^[a-zA-Z0-9\*\.+=-\s\/]+$/;
  let inputsStringTab = []; // tableau des objets a traitees
  let ArrayInput = [];

  /**
   * verifie la validite du nbre d'input a entrer, puis appelle les fonctions neccessairent pour creer celle ci
   */

  /**
 Cree et ajoute un input au parent precise
 * @param {HTMLElement} parent
 index de l'element pour gerer la transition
 * @param {Number} i
 */
  function createInput(parent, i) {
    let input = document.createElement("input");
    input.placeholder = "ax + by+ ...+cz = d";
    input.style.animationName = i % 2 ? "ani-inputs-right" : "ani-inputs-left";
    input.style.animationDelay = `${(i + 1) * 0.3}s`;
    parent.appendChild(input);
  }

  class DisplayUI {
    static displayInput() {
      let nbre = document.querySelector("#nbre");

      nbre.addEventListener("blur", (e) => {
        solution.innerHTML = "";
        let numberOfInput = parseInt(e.currentTarget.value);
        if (isNaN(e.currentTarget.value) || numberOfInput <= 1) {
          alert("Bien Vouloir saisir un entier superieur a 1");
          return;
        } else {
          inputs.innerHTML = "";
          // cette me permet de creer mes differents inputs et de leurs faire passer mes animation
          for (let i = 0; i < numberOfInput; i++) {
            createInput(inputs, i);
          }
          //ArrayInput = Array.from(inputs.querySelectorAll("input"));
          //inputsStringTab.length = ArrayInput.length; // tableau de taille egale au nbre de input
          traitement(inputs);
        }
      });
    }
  }

  /**
 *pour capturer le contenu des equations Input a resoudre
@param { HTMLElement} conteneur des inputs
 */

  function traitement(conteneur) {
    let arr = conteneur.querySelectorAll("input");

    arr.forEach((elt, index) => {
      elt.addEventListener("blur", function (e) {
        solution.innerHTML = "";
        let str = e.target.value;
        let rep = myRegex.test(str);
        //console.log(rep);

        if (rep) {
          //pour supprimer tout les espaces blancs
          //let obj = {};
          str = str.replace(/\s{1,}/g, "");
          //obj["string"] = str;
          inputsStringTab[index] = str;
          //console.table(inputsStringTab);
        } else {
          errorStylingInput(inputs.querySelectorAll("input")[index]);
        }
      });
    });
  }

  /**
   * on commence l'evaluation des equations lorsque l'utilisateur clique sur le boutton solution
   */

  const handleClickButton = () => {
    solution.innerHTML = "";
    let stringError = "";
    const nbre = parseInt(document.querySelector("#nbre").value);

    if (inputsStringTab.length != nbre) {
      stringError += "Bien vouloir remplir tous les champs.\n";
      //console.log(stringError);
    } else {
      for (let k = 0; k < inputsStringTab.length; k++) {
        const string = inputsStringTab[k];

        if (!string) {
          stringError += `Veillez Remplir le Champ   ${k}  -\n`;
          errorStylingInput(inputs.querySelectorAll("input")[k]);
        }
      }
    }

    if (stringError) {
      alert(stringError);
    } else if (inputsStringTab.length > 0) {
      //console.table(inputsStringTab)
      /****************the second part******************************* */
      //chaque input est transforme en un objet personnalise
      let inputsOjects = [...inputsStringTab];

      inputsOjects = inputsOjects.map((elt) => {
        return {
          ["string"]: elt,
        };
      });
      inputsOjects.map(transformString);

      const keysObject = Object.keys(inputsOjects[0].table);
      const keysLenght = keysObject.length;
      let stringError1 = "";
      /*************************************************************** */
      if (keysLenght != nbre)
        stringError1 +=
          "Le nombre d'arguments dans chaque equation doit etre compris entre 1 et " +
          nbre +
          "\n";

      for (let i = 0; i < inputsOjects.length; i++) {
        const key = Object.keys(inputsOjects[i].table);
        if (key.length > keysLenght) {
          stringError1 += "Bien remplir le champs n°-" + (i + 1) + "\n";
          errorStylingInput(inputs.querySelectorAll("input")[i]);
        }

        if (key.length == keysLenght) {
          for (let j = 0; j < keysObject.length; j++) {
            const keysObjectTable = Object.keys(inputsOjects[0].table[j]);

            for (const k of keysObjectTable) {
              if (!inputsOjects[i].table[j].hasOwnProperty(k)) {
                stringError1 += "Champs mal rempli : " + (i + 1) + "\n";
                errorStylingInput(inputs.querySelectorAll("input")[i]);
                break;
              }
            }
          }
        }

        try {
          eval(inputsOjects[i].constante);
        } catch (error) {
          stringError1 +=
            "Nombre d'arguments insuffisants ou de trop a la ligne n°-" +
            (i + 1) +
            "\n";
          errorStylingInput(inputs.querySelectorAll("input")[i]);
        }
      }
      /************************************************************/
      if (stringError1) {
        alert(stringError1);
      } else {
        solution.innerHTML = `<h5>Solution du Systeme:
      </h5> <p style="font-size: 1.3rem;">${solutionSysteme(inputsOjects)}</p>`;
      }
    }
  };

  /**
   * Ajoute du style a l'input concerner pour indiquer une erreur
   * @param {InputElement} input
   */
  function errorStylingInput(input) {
    if (input) {
      input.style.borderColor = "red";
      // input.style.color  ='black'
      input.style.backgroundColor = "rgba(255, 0, 0, 0.356)";
      // input.style.boxShadow  ='2px 5px 10px rgba(219, 11, 11, 0.356)'
      input.addEventListener("focus", function () {
        input.style.removeProperty("background-color");
        input.style.removeProperty("border-color");
      });
    } else {
      alert("Bien vouloir choisir un nbre de champs");
    }
  }

  /*********************Main Logic Start Here  ********************************* */

  const UI = new DisplayUI();

  DisplayUI.displayInput();

  //solutionButton.style.backgroundColor = "red"
  solutionButton.addEventListener("click", handleClickButton);
});
