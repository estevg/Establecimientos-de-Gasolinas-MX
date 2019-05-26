const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarEstablecimientos();
})

const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {
    // console.log(buscador.value); // Muestra los resultados
    // console.log(buscador.value.length); // Muestra cuantas letras hemos escrito
    if(buscador.value.length > 5){
        ui.obtenerSugerencias(buscador.value);
    }else{
        ui.mostrarEstablecimientos();
    }
})