const folder = document.querySelector(".hamburguesa");
const navegacion = document.querySelector("nav");
const botoneros = document.querySelector(".botoneros");
const btns = document.querySelector(".btn");


folder.addEventListener("click", () => {
    navegacion.classList.toggle("visible");
    botoneros.classList.toggle("visible");
});