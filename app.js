//Crea un array de amigos.
let amigos = [];
//Obtiene al elemento botón sortear
const botonSortear = document.querySelector(".button-draw");
//Bloqueo el botón sortear
botonSortear.disabled =true;
//Obtiene elemento Input de html
const inputNombre= document.getElementById("amigo");
//Cursor fijado en el input amigo 
inputNombre.focus()
const botonAgrega= document.querySelector(".button-add");
//al presionar el la tecla "enter" funciona el botón "agregar"
inputNombre.addEventListener("keypress", function (evento) {
    if(evento.key === "Enter"){
        evento.preventDefault();
        botonAgrega.click();
    }    
});
//Muestra el listado de amigo al comenzar el programa
mostrarUl(true);

//Agrega nombre a la lista de "amigos".
function agregar(nombre, lista) {
    let comprobar = ValidarNombre(nombre, lista);
    if(comprobar===true)
    {
        alert(`${nombre} ya se encuentra en la lista`);
    }else{
        lista.push(nombre);
    }
}

//Agrega listado de amigo en la vista <ul>
function muestraListado(lista) {
    const listaAmigos = document.getElementById("listaAmigos");
        for(let i=0; i<lista.length; i++){
            const dato = lista[i];
            const liExiste = listaAmigos.children[i];
            if(liExiste){
                //si el elemento ya existe se actualiza(no duplica). Puede sortear y luego agrega mas amigos en medio del sorteo
                if(liExiste.textContent != dato){
                    liExiste.textContent = dato;
                }
            }else{
            //cargo el listado existente 
            cargaDatosVistaUl(lista, i, "listaAmigos", true);
            }
        }
}

//Verifica si el nombre ingresado por el usuario está en la lista
function ValidarNombre(nombre, lista) {
    let valor = false;
    if(lista.length>0){
        for (let i =0; i< lista.length; i++){
            if(nombre==lista[i]){
                valor= true;//encuentra el nombre en la lista
                return valor;
            }
        } 
    }else{
        return valor;
    }    
    return valor;
}

//Elimina amigo del listado
function eliminaAmigo(nombre, lista) {
    //obtiene <ul> de amigos para eliminar la fila
    const htmlListaAmigos = document.getElementById("listaAmigos");
    //obtiene índice del nombre encontrado en la lista
    let i= lista.indexOf(nombre);
    if(i !=-1){
        //elimina en el array "1" elemento en el i(índice) encontrado.
        lista.splice(i,1);
        //obtener la referencia al elemento <li> a eliminar
        const elementoAEliminar = document.getElementById(nombre);
        //eliminar el elemento <li> del elemento <ul>    
        htmlListaAmigos.removeChild(elementoAEliminar);
    }
}

//Generar número aleatorio (índice) entre 0 y cantidad de elemento en la lista
function numeroAleatorio(lista) {
    return Math.floor(Math.random()*lista.length);
}

//Crear elemento <li> y agrega el dato en la <ul>
function cargaDatosVistaUl(lista, indice, ulId, booleanoEsLista) {
    //obtiene elemento <ul>
    let listaUl = document.getElementById(ulId);
    //creo elemento <li> de Html  para listado
    const nuevoLi = document.createElement("li");  
    let nombre = lista[indice];
            if(booleanoEsLista)//es lista?, true 
            {
                //asigna el dato a la <li> 
                nuevoLi.innerHTML= nombre;
                //asigna un id al nuevo <li>, para luego eliminarlo
                nuevoLi.id=nombre;
            }else{//no es lista, false
                //elimina los <li> de los <ul> "resultado" para que no genere un listado.
                listaUl.innerHTML = "";
                //agrega texto plano + dato a la <li>
                nuevoLi.innerHTML = `El amigo secreto sorteado es: ${nombre}`;
            }
    //Agrego el dato a la vista lista que corresponda
    listaUl.appendChild(nuevoLi);            
}
 
//Habilita o deshabilita la vista de los <ul>
function mostrarUl(booleanoMostrar) {
    const idUl1 = document.getElementById("listaAmigos");
    const idUl2 = document.getElementById("resultado");
    if(booleanoMostrar){//mostrar listado
        idUl1.style.display = "list-item";
        idUl2.style.display = "none";
    }else{//mostrar resultado
        idUl2.style.display = "list-item";
        idUl1.style.display = "none";
    }    
}

//Botón agregar amigo a la lista
function agregarAmigo() {
    let nombreAmmigo = document.getElementById("amigo").value;
    if(nombreAmmigo!=""){//verifica que el input no esté vacío
        agregar(nombreAmmigo, amigos);
        muestraListado(amigos);
        mostrarUl(true);
        //limpia input
        document.getElementById("amigo").value = "";
        //habilita el botón sortear amigo
        botonSortear.disabled = false;
    }else{
        alert("Por favor, inserte un nombre");
    }
}

//Botón sortear amigo secreto
function sortearAmigo() {
    if(amigos.length>0){//verifica que el listado de amigos tenga dato
        //obtiene un número aleatorio
        let numeroSeleccionado = numeroAleatorio(amigos);
        //muestra en la vista <ul> resultado con el índice
        cargaDatosVistaUl(amigos,numeroSeleccionado, "resultado", false);
        //elimina el amigo sorteado de la lista de amigos con el índice
        eliminaAmigo(amigos[numeroSeleccionado], amigos);
        //habilit el <ul> resultado
        mostrarUl(false);
    }else{
        alert("Lista de amigos está vacía");
        //deshabilita el botón de sortear
        botonSortear.disabled = true;
        mostrarUl(true);

    }  
}
