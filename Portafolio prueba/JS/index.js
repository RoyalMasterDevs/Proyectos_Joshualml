const barProyectos = document.querySelector(".btnProyectos");
const barEscolaridad = document.querySelector(".btnEscolaridad");
const barHabilidades = document.querySelector(".btnHabilidades");
const barSpan = document.querySelector(".barSpan");
const showProyectos = document.querySelector(".container-proyectos");
const showEscolaridad = document.querySelector(".container-Escolaridad");
const showHabilidades = document.querySelector(".container-Habilidades");


barProyectos.addEventListener("click", () => {
    barSpan.classList.add("Proyectos");
    barSpan.classList.remove("Escolaridad");
    barSpan.classList.remove("Habilidades");
    showProyectos.style.display = "block";
    showEscolaridad.style.display = "none";
    showHabilidades.style.display = "none";

})
barEscolaridad.addEventListener("click", () => {
    barSpan.classList.remove("Proyectos");
    barSpan.classList.add("Escolaridad");
    barSpan.classList.remove("Habilidades");
    showProyectos.style.display = "none";
    showEscolaridad.style.display = "block";
    showHabilidades.style.display = "none";

})
barHabilidades.addEventListener("click", () => {
    barSpan.classList.remove("Proyectos");
    barSpan.classList.remove("Escolaridad");
    barSpan.classList.add("Habilidades");
    showProyectos.style.display = "none";
    showEscolaridad.style.display = "none";
    showHabilidades.style.display = "block";

})