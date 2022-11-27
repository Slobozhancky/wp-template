import counter from "./counter";
import "./styles/style.css";

import data from "./assets/data.json";
import Img from "./assets/images/img.jpg";

const body = document.querySelector("body");
const btn = document.createElement("button");
let counterTitle = document.querySelector(".counter_title");

let count = 0;
function getRes() {
    count = counter(count);
    counterTitle.innerHTML = count;
}

btn.classList.add("btn");
btn.innerHTML = "Click me";

btn.addEventListener("click", () => getRes());

body.appendChild(btn);

const img = new Image();
img.src = Img;

body.appendChild(img);

console.log(img);
