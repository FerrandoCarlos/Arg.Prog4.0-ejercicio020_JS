//Variables globales
const formElement = document.querySelector(".form");
const titleElement = document.getElementById("title");
const authorElement = document.getElementById("author");
const yearElement = document.getElementById("year");
const saveElement = document.getElementById("btnsave");
const eraseElement = document.getElementById("btnerase");
const messageElement = document.getElementById("message");
const responseElement = document.getElementById("response");


saveElement.addEventListener("click", (e) => {
    //console.log(titleElement.value);
    e.preventDefault();
    //validar si todos los campos fueron rellenados
    if (titleElement.value.trim() === "" && authorElement.value.trim() === "" && yearElement.value.trim() === "") {
        //alert('Debes ingresar el titulo');
        messageElement.innerHTML = "<p class='error'>Todos los campos deben ser llenados!!</p>";
    } else {
        guardarLibro();
    }
})

function guardarLibro() {
    let titulo = titleElement.value;
    let autor = authorElement.value;
    let anio = yearElement.value;

    if (titulo.length > 0 && autor.length > 0 && anio.length > 0) {
        document.querySelector(".form").reset();
        const libroNuevo = {
            "titulo": titulo,
            "autor": autor,
            "year": anio
        };

        //verificamos si hay datos guardados en localStorage. 
        //Si están guardados los obtenemos y los convertimos a un array de JSON. De lo contrario creamos un Array vacío.
        const datos = localStorage.getItem("libros") ? JSON.parse(localStorage.getItem("libros")) : [];
        datos.push(libroNuevo);

        localStorage.setItem("libros",JSON.stringify(datos));
        messageElement.innerHTML = "<p class='exito'>Libro guardado correctamente!!</p>";
        cargarLibros();
    } 

}

function cargarLibros(){
    if (localStorage.getItem("libros")) {
        responseElement.innerHTML = "<ul></ul>";
        const libros = JSON.parse(localStorage.getItem("libros"));
        libros.forEach((libro) => {
            document.querySelector("#response ul").insertAdjacentHTML("beforeend",`
            <li>
                ${libro.titulo} (${libro.year}) - Escrito por: ${libro.autor}.
            </li>`)
        });
    } else {
        messageElement.innerHTML = "<p><strong>No hay libros guardados aún!!</strong></p>"
    }
}   

eraseElement.addEventListener("click",(e)=>{
    e.preventDefault();
    borrarLibros();
});

function borrarLibros(){
    localStorage.removeItem('libros');
    responseElement.innerHTML="";
    cargarLibros();
}