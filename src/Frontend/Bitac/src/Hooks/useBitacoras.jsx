// hooks/useBitacoras.js
import { useState, useEffect } from "react";
import { fetchBitacoras } from "../Services/bitacorasApi";

const useBitacoras = () => {
  const [bitacoras, setBitacoras] = useState([]);
  const [filteredBitacoras, setFilteredBitacoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBitacoras = async () => {
      setLoading(true);
      try {
        const data = await fetchBitacoras();
        setBitacoras(data);
        setFilteredBitacoras(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    loadBitacoras();
  }, []);

  const filterBitacoras = (query, filters) => {
    const { fechaInicio, fechaFin, ubicacion, habitat, clima } = filters;

    const filtered = bitacoras.filter((bitacora) => {
      const matchesQuery = query
        ? bitacora.titulo.toLowerCase().includes(query.toLowerCase())
        : true;

      const matchesFecha =
        (!fechaInicio || new Date(bitacora.fecha) >= new Date(fechaInicio)) &&
        (!fechaFin || new Date(bitacora.fecha) <= new Date(fechaFin));

      const matchesUbicacion = ubicacion
        ? bitacora.ubicacion.toLowerCase().includes(ubicacion.toLowerCase())
        : true;

      const matchesHabitat = habitat
        ? bitacora.habitat.toLowerCase().includes(habitat.toLowerCase())
        : true;

      const matchesClima = clima
        ? bitacora.clima.toLowerCase().includes(clima.toLowerCase())
        : true;

      return (
        matchesQuery && matchesFecha && matchesUbicacion && matchesHabitat && matchesClima
      );
    });

    setFilteredBitacoras(filtered);
  };

  return {
    bitacoras,
    filteredBitacoras,
    loading,
    error,
    filterBitacoras,
  };
};

export default useBitacoras;