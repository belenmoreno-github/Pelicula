
// MODELO DE DATOS

let mis_peliculas_iniciales = [
    {titulo: "Superlópez",   director: "Javier Ruiz Caldera", "miniatura": "files/superlopez.png"},
    {titulo: "Jurassic Park", director: "Steven Spielberg", "miniatura": "files/jurassicpark.png"},
    {titulo: "Interstellar",  director: "Christopher Nolan", "miniatura": "files/interstellar.png"}
];

localStorage.mis_peliculas = localStorage.mis_peliculas || JSON.stringify(mis_peliculas_iniciales);


// VISTAS

// index

const indexView = (peliculas) => {
    let i=0;
    let view = "";

    while(i < peliculas.length) {
        view += `
        <div class="movie">
            <div class="movie-img">
                <img data-my-id="${i}" src="${peliculas[i].miniatura}" onerror="this.src='files/placeholder.png'"/>
            </div>
            <div class="title">
                ${peliculas[i].titulo || "<em>Sin título</em>"}
            </div>
            <div class="actions">
                <button class="show" data-my-id="${i}">ver</button>
                <button class="edit" data-my-id="${i}">editar</button>
                <button class="delete" data-my-id="${i}">borrar</button>
            </div>
        </div>\n`;
        i = i + 1;
    };

    view += `<div class="actions">
                <button class="new" data-my-id="${i}">añadir</button>
                <button class="reset" data-my-id="${i}">reset</button>
            </div>`;

    return view;
};

// edit
const editView = (i, pelicula) => {

    return `<h2>Editar Película </h2>
        <div class="field">
        Título <br>
        <input  type="text" id="titulo" placeholder="Título" 
                value="${pelicula.titulo}">
        </div>
        <div class="field">
        Director <br>
        <input  type="text" id="director" placeholder="Director" 
                value="${pelicula.director}">
        </div>
        <div class="field">
        Miniatura <br>
        <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                value="${pelicula.miniatura}">
        </div>
        <div class="actions">
            <button class="update" data-my-id="${i}">
                Actualizar
            </button>
            <button class="index">
                Volver
            </button>
        `;
}

// show
const showView = (pelicula) => {

    //Opción "Ver" que muestra información de la película seleccionada.
    
    return `
    <div class="field">
    Información:
    </div>
        <p>
        La película <b> ${pelicula.titulo} </b> 
        fue dirigida por <b> ${pelicula.director} </b> !
        </p>

        <div class="actions">
            <button class="index">Volver</button>
        </div>`;
}

// new
const newView = () => {

    // Opción "Crear" que crea un apartado para una nueva película elegida por el usuario
    
    return `<h2>Crear Película</h2>
        <h3>Introducir nueva película: </h3>

        <div class="field">
        Título <br>
        <input  type="text" id="titulo" placeholder="Título"
        value="">
        </div>
        <div class="field">
        Director <br>
        <input  type="text" id="director" placeholder="Director" 
        value="">
        </div>
        <div class="field">
        Miniatura <br>
        <input  type="text" id="miniatura" placeholder="URL de la miniatura"
        value=""> 
    
        </div>
        
        <div class="actions">
            <button class="create">crear</button>
            <button class="index">Volver</button>
        </div>`;
}



// CONTROLADORES 

//Index
const indexContr = () => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    document.getElementById('main').innerHTML = indexView(mis_peliculas);
};

//Mostrar
const showContr = (i) => {
    // Controlador que muestra la vista showView(pelicula)
    let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
    document.getElementById('main').innerHTML = showView(pelicula);

};

//New ("Añadir")
const newContr = () => {
    // Controlador que muestra la vista newView()
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    document.getElementById('main').innerHTML = newView(mis_peliculas);
};

//Crear
const createContr = () => {
    // Controlador que crea una película nueva en el modelo guardado en localStorage
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    var pelicula_nueva = {
        titulo: document.getElementById('titulo').value,
        director: document.getElementById('director').value,
        "miniatura": document.getElementById('miniatura').value};
    mis_peliculas.push(pelicula_nueva);
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr();
};
    
    
//Editar
const editContr = (i) => {
    let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
    document.getElementById('main').innerHTML = editView(i, pelicula);
};

//Actualizar
const updateContr = (i) => {
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    mis_peliculas[i].titulo    = document.getElementById('titulo').value;
    mis_peliculas[i].director  = document.getElementById('director').value;
    mis_peliculas[i].miniatura = document.getElementById('miniatura').value;
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr();
};

//Eliminar
const deleteContr = (i) => {
    // Controlador que actualiza el modelo borrando la película seleccionada
    // Genera diálogo de confirmación: botón Aceptar devuelve true, Cancel false
    let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
    var confirmacion = confirm("Se eliminará la película elegida, ¿Está seguro de que quiere eliminarla?")
    if (confirmacion == true) {
        mis_peliculas.splice(i,1);
        localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
        indexContr();
    } else {
        indexContr();
    }
      
};

//Resetear
const resetContr = () => {
    // Controlador que reinicia el modelo guardado en localStorage con las películas originales
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas_iniciales);
    indexContr();
};



// ROUTER de eventos

const matchEvent = (ev, sel) => ev.target.matches(sel);
const myId = (ev) => Number(ev.target.dataset.myId);

document.addEventListener('click', ev => {
    if      (matchEvent(ev, '.index'))  indexContr  ();
    else if (matchEvent(ev, '.edit'))   editContr   (myId(ev));
    else if (matchEvent(ev, '.update')) updateContr (myId(ev));
    else if (matchEvent(ev, '.show'))  showContr (myId(ev));
    else if (matchEvent(ev, '.new')) newContr (myId(ev));
    else if (matchEvent(ev, '.create')) createContr (myId(ev));
    else if (matchEvent(ev, '.delete')) deleteContr (myId(ev));
    else if (matchEvent(ev, '.reset')) resetContr (myId(ev));
 
})



// Inicialización        
document.addEventListener('DOMContentLoaded', indexContr);
