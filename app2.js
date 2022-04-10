import { animals } from "./animals";
import React from "react";
import ReactDOM from "react-dom";

const title = "";
const background = (
  <img className="background" alt="ocean" src="/images/ocean.jpg" />
);

const images = [];
for (let animal in animals) {
  images.push(
    <img
      key={animal}
      className="animal"
      alt={animal}
      src={animals[animal].image}
      aria-label={animal}
      role="button"
      onClick="displayFact()"
    />
  );
}

const displayFact = (e) => {
  const clickedAnimal = e.target.alt;
  const animalInfo = animals[clickedAnimal];
  const optionIndex = Math.floor(Math.random() * clickedAnimal.facts.length);
  const funFact = animalInfo.facts[optionIndex];
  document.getElementById("fact").innerHTML = funFact;
};

const animalFacts = (
  <div>
    <h1>{title === "" ? "Click an animal for a fun fact" : title}</h1>
    {background}
    <div className="animals">{images}</div>
    <p id="fact"></p>
  </div>
);

ReactDOM.render(animalFacts, document.getElementById("root"));
