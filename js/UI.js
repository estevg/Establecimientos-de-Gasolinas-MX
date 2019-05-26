class UI {
    constructor() {

        // Instanciar la API
        this.api = new API();

        // Crear los markers con layerGroup
        this.markers = new L.LayerGroup();

         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;

    }

    mostrarEstablecimientos(){
         this.api.obtenerDatos()
         .then(datos => {
            // console.log(datos.respuestaJSON.results);
             const resultado = datos.respuestaJSON.results;

             this.mostrarPines(resultado);
         })
    }

    mostrarPines(datos){
        // Limpiar los markers
        this.markers.clearLayers();

        // recorer los establecimientos
        datos.forEach( dato => {
            // destructuring 
            const {latitude, longitude, calle, regular, premium} = dato;

                // Crear Popup
                const opncionesPooUp = L.popup()
                    .setContent(`<p>Calle: ${calle}</p>
                    <p><b>Regular:</b> ${regular}</p>
                    <p><b>Premium:</b> ${premium}</p> 
                    
                    `)


            // Agregar pin
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opncionesPooUp);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);
    }

    // Buscador 
    obtenerSugerencias(busqueda){
        this.api.obtenerDatos()
            .then(datos => {
                // obtener los datos nuevamente
                const resultados = datos.respuestaJSON.results;
                // Enviar el JSON y la busqueda para filtrar
               this.filtrarSugerencias(resultados, busqueda)
            })
    }
    // Filtrar sugerencias
    filtrarSugerencias(resultado, busqueda){
        // filtrar con .filter
        const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
        // console.log(filtro);

        // mostrar los pines
        this.mostrarPines(filtro);
    }
}