import counter from "./counter";
import "./styles/style.css";
import "./styles/less.less";

import data from "./assets/data.json";
import Img from "./assets/images/img.jpg";

const body = document.querySelector("body");
const btn = document.createElement("button");
let counterTitle = document.querySelector(".counter_title");
const divLogo = document.querySelector(".logo");

let count = 0;
function getRes() {
    count = counter(count);
    counterTitle.innerHTML = count;
}

btn.classList.add("btn");
btn.innerHTML = "Click me";

btn.addEventListener("click", () => getRes());

divLogo.after(btn);

const img = new Image();
img.src = Img;

divLogo.after(img);
