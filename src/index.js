import counter from "./counter";
import "./styles/style.css";

import data from "./assets/data.json";

const body = document.querySelector("body");
const btn = document.createElement("button");
let counterTitle = document.querySelector(".counter_title");

console.log(data);

btn.classList.add("btn");
btn.innerHTML = "Click me";
let count = 0;
function getRes() {
    count = counter(count);
    counterTitle.innerHTML = count;
}

btn.addEventListener("click", () => getRes());

body.appendChild(btn);
