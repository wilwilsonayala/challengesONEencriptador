const mensaje = document.getElementById('mensaje');
const encriptar = document.getElementById('encriptar');
const desencriptar = document.getElementById('desencriptar');
const ningunMensaje = document.getElementById('ningunMensaje');
const mensajeEncontrado = document.getElementById('mensajeEncontrado');
const copiarMensaje = document.getElementById('copiarMensaje');
const mensajeEncriptado = document.getElementById('mensajeEncriptado');
const modal = document.getElementById("modal");
const modalButton = document.getElementById("modalButton");

const llaves = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
}

const reversedLlaves = Object.keys(llaves).reduce((accum, next) => {
    const value = llaves[next];
    accum[value] = next;
    return accum;
}, {})

/**
 * 
 * @param {Record<string,string>} diccionario
 * 
 */

function preRegExp(diccionario){
    const preRegex = Object.keys(diccionario).reduce((accum, next) => accum+"|"+next);
    return new RegExp(preRegex, 'g')
}

function encriptarTexto(text, diccionario){
    return text.replace(preRegExp(diccionario), (match) => diccionario[match]);
}

function checkString(string){
    const check = /[^a-z 0-9]/g.test(string);
    if(check){
        modal.style.display = "flex";
    }
    return !check;
}

function toggleMensaje(texto, textoEncriptado){
    if(checkString(texto) && texto != ""){
        if(mensajeEncontrado.classList.contains('aside__content--none')){
            mensajeEncontrado.classList.toggle('aside__content--none');
            ningunMensaje.classList.toggle('aside__content--none');
        }
        mensajeEncriptado.innerHTML = textoEncriptado;
    }
}
modalButton.addEventListener('click', function(e){
    e.preventDefault();
    modal.style.display = "none";
});
encriptar.addEventListener('click', function(e){
    e.preventDefault();
    toggleMensaje(mensaje.value, encriptarTexto(mensaje.value, llaves));
    mensaje.value ='';
})
desencriptar.addEventListener('click', function(e){
    e.preventDefault();
    toggleMensaje(mensaje.value, encriptarTexto(mensaje.value, reversedLlaves));
})
copiarMensaje.addEventListener('click', () => {
    //navigator.clipboard.writeText(mensajeEncriptado.innerHTML);
    /*const encriptado = mensajeEncriptado.innerHTML;
    navigator.clipboard.writeText(encriptado).then(() => {
        mensajeEncriptado.innerHTML = '';
        mensaje.value = encriptado; 
    });*/
    const encriptado = mensajeEncriptado.innerHTML;
    navigator.clipboard.writeText(encriptado).then(() => {
        mensaje.value = encriptado;
        // Mostrar la imagen original y ocultar el mensaje encriptado
        mensajeEncontrado.classList.add('aside__content--none');
        ningunMensaje.classList.remove('aside__content--none');
    });

})