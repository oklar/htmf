import "./style.css";
import { HTMF } from "./htmf.js";

const html = new HTMF();
const output2 = html
  .div("Click on me to do a get request")
  .get("http://localhost:3000/products")
  .target("my-template")
  ._div()
  .div("test")
  .template("my-template")
  .div((student) => `Product name: ${student.name}`)
  ._div()
  .render();

const output = html
  .div("Click on me to do a get request")
  .get("http://localhost:3000/products")
  .h2((product) => `Product name: ${product.name}`)
  ._h2()
  .h3((product) => `Product price: ${product.price}`)
  ._closed()
  .render();

console.log(output);

document.querySelector("#app").innerHTML = "<h1>" + "hello" + "</h1>";

// setupCounter(document.querySelector("#counter"));
