// api/bitacorasApi.js
export const fetchBitacoras = async () => {
    try {
      // Cambia esta línea para usar la URL de tu backend
      const response = await fetch("http://localhost:5000/api/logs");
      
      if (!response.ok) {
        throw new Error(`Error al obtener las bitácoras: ${response.status}`);
      }
      
      // Retorna los datos en formato JSON
      return await response.json();
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };  
  