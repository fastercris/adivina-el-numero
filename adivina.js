let randomNumber = null;
let min = 1;
let max = 100;

const iniciarJuego = () => {
    document.body.innerHTML = "";  //Limpiar body
    mostrarTexto("Piensa en un número del 1 al 100 y lo adivinaré.", 2000, mostrarSegundoTexto);
}

//Mostrar texto temporal
const mostrarTexto = (texto, tiempo, callback) => {
    const titulo = document.createElement("h4");
    titulo.textContent = texto;
    titulo.style.margin = "20px";
    document.body.appendChild(titulo);

    setTimeout(() => {
        titulo.style.display = "none";
        callback();
    }, tiempo);
}

const mostrarSegundoTexto = () => {
    mostrarTexto("¿Estás listo?", 2000, jugar);
}

//Numero random
const jugar = () => {
    randomNumber = Math.floor((Math.random() * (max - min + 1)) + min);
    opciones();
}

//Creacion de botones nuevos
const opciones = () => {
    document.body.innerHTML = "";

    const numeroMostrar = document.createElement("h4");
    numeroMostrar.textContent = `Este es tu numero: ${randomNumber}`;
    document.body.appendChild(numeroMostrar);

    //Nuevos botones
    const superiorButton = document.createElement("button");
    superiorButton.textContent = "Es mayor";
    superiorButton.classList.add("btn", "btn-outline-success");
    superiorButton.style.margin = "10px";
    superiorButton.onclick = () => actualizarRango("Es mayor");

    const inferiorButton = document.createElement("button");
    inferiorButton.textContent = "Es menor";
    inferiorButton.classList.add("btn", "btn-outline-danger");
    inferiorButton.style.margin = "10px";
    inferiorButton.onclick = () => actualizarRango("Es menor");

    const adivinaste = document.createElement("button");
    adivinaste.textContent = "Ese es mi número";
    adivinaste.classList.add("btn", "btn-outline-warning");
    adivinaste.style.margin = "10px";
    adivinaste.onclick = () => resultado(true);

    document.body.appendChild(superiorButton);
    document.body.appendChild(inferiorButton);
    document.body.appendChild(adivinaste);
}


//Modificar rango de acuerdo al boton presionado
const actualizarRango = (opcion) => {

    if (opcion === "Es mayor") {
        min = randomNumber + 1;
    }
    else {
        max = randomNumber - 1;
    }

    if (min <= max) {
        randomNumber = Math.floor((Math.random() * (max - min + 1)) + min);
        const numeroMostrar = document.querySelector("h4");
        numeroMostrar.textContent = `Este es tu numero: ${randomNumber}`;
    } else {
        // Si sobre pasas el rango, mostrar mensaje de error
        const numeroMostrar = document.querySelector("h4");
        numeroMostrar.textContent = "¡No puedes elegir más!";
    }
    opciones();
}


//Mensaje ganador y reiniciar juego
const resultado = (acertado) => {
    const resultado = document.createElement("h3");
    const img = document.createElement("img");
    const saltoDeLinea = document.createElement("br");

    if (acertado) {
        resultado.textContent = `¡Gané! He adivinado que tu número es ${randomNumber}.`;
        img.src = "./nelson.gif";
    }

    document.body.innerHTML = "";
    document.body.appendChild(resultado);
    document.body.appendChild(img);
    document.body.appendChild(saltoDeLinea);

    const reiniciar = document.createElement("button");
    reiniciar.textContent = "Jugar otra vez";
    reiniciar.classList.add("btn", "btn-outline-info");
    reiniciar.style.margin = "10px";
    reiniciar.onclick = () => {
        randomNumber = null;
        min = 1;
        max = 100;
        iniciarJuego();
    };
    document.body.appendChild(reiniciar);
}