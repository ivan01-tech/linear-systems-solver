import "./style.css";
import "./equation"

document.querySelector("#app").innerHTML = `
<aside>Resolveur de Systemes Lineaires</aside>

<header>
  <div class="div-header">
    <h3>Système de n équations à n inconnus</h3>
    <label for="nbre"> Le nombre d'eqautions ici : </label>
    <input
      id="nbre"
      type="text"
      min="0"
      placeholder="Le nombre d'equation ici"
    />
  </div>
</header>

<div>
  <p
    class="indication"
    style="background-color: blue; color: rgb(252, 249, 248); right: 0"
  >
    Vos équations
  </p>
</div>

<section id="inputs">
  <input type="text" />
</section>

<div>
  <button
    class="indication"
    id="solutionButton"
    style="
      background-color: rgba(8, 238, 8, 0.493);
      left: 0;
      font-size: 1.2rem;
    "
  >
    Solutions
  </button>
</div>

<section id="solution"></section>
`;
