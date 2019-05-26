class API {

    async obtenerDatos(){
        // Total
        const total = 500;

        // Obtener los datos de la API
        const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);

        // retornar datos como json
        const respuestaJSON = await datos.json();

        return {
            respuestaJSON
        }
    }
}