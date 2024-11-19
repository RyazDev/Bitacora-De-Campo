import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../Services/apiClient"; 
import "./CreateLog.css";

const CreateLog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    samplingDate: "",
    location: { coordinates: [0, 0] },
    weatherConditions: "",
    habitatDescription: "",
    speciesCollected: [],
    additionalNotes: "",
    photos: [],
  });

  const [species, setSpecies] = useState({ scientificName: "", commonName: "", family: "", sampleCount: 0, plantState: "", photos: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCoordinatesChange = (index, value) => {
    const updatedCoordinates = [...formData.location.coordinates];
    updatedCoordinates[index] = parseFloat(value);
    setFormData({ ...formData, location: { ...formData.location, coordinates: updatedCoordinates } });
  };

  const handleAddSpecies = () => {
    if (!species.scientificName || !species.commonName || !species.family || species.sampleCount <= 0 || !species.plantState) {
      setValidationError("Por favor, completa todos los campos de la especie.");
      return;
    }
    setFormData({ ...formData, speciesCollected: [...formData.speciesCollected, species] });
    setSpecies({ scientificName: "", commonName: "", family: "", sampleCount: 0, plantState: "", photos: [] });
    setValidationError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setValidationError(""); 
  
    if (!formData.title || !formData.samplingDate || !formData.location.coordinates[0] || !formData.location.coordinates[1] || !formData.weatherConditions || !formData.habitatDescription) {
      setValidationError("Por favor, completa todos los campos obligatorios.");
      setLoading(false);
      return;
    }
  
    try {
      const createdLog = await apiClient.createLog(formData);
  
      navigate(`/logs/${createdLog._id}`);  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-log-page">
      <h2>Crear Nueva Bitácora</h2>
      {error && <p className="error-message">{error}</p>}
      {validationError && <p className="validation-error">{validationError}</p>} 

      <form onSubmit={handleSubmit} className="create-log-form">
        <label>
          Título:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>

        <label>
          Fecha de Muestreo:
          <input type="date" name="samplingDate" value={formData.samplingDate} onChange={handleChange} required />
        </label>

        <label>
          Coordenadas (Latitud y Longitud):
          <input type="number" placeholder="Latitud" value={formData.location.coordinates[0]} onChange={(e) => handleCoordinatesChange(0, e.target.value)} required />
          <input type="number" placeholder="Longitud" value={formData.location.coordinates[1]} onChange={(e) => handleCoordinatesChange(1, e.target.value)} required />
        </label>

        <label>
          Condiciones Climáticas:
          <input type="text" name="weatherConditions" value={formData.weatherConditions} onChange={handleChange} />
        </label>

        <label>
          Descripción del Hábitat:
          <textarea name="habitatDescription" value={formData.habitatDescription} onChange={handleChange}></textarea>
        </label>

        <fieldset>
          <legend>Añadir Especie</legend>
          <input type="text" placeholder="Nombre Científico" value={species.scientificName} onChange={(e) => setSpecies({ ...species, scientificName: e.target.value })} />
          <input type="text" placeholder="Nombre Común" value={species.commonName} onChange={(e) => setSpecies({ ...species, commonName: e.target.value })} />
          <input type="text" placeholder="Familia" value={species.family} onChange={(e) => setSpecies({ ...species, family: e.target.value })} />
          <input type="number" placeholder="Cantidad de Muestras" value={species.sampleCount} onChange={(e) => setSpecies({ ...species, sampleCount: parseInt(e.target.value, 10) })} />
          <input type="text" placeholder="Estado de la Planta" value={species.plantState} onChange={(e) => setSpecies({ ...species, plantState: e.target.value })} />
          <button type="button" onClick={handleAddSpecies}>Añadir Especie</button>
          {validationError && <p className="validation-error">{validationError}</p>} 
        </fieldset>

        <label>
          Notas Adicionales:
          <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange}></textarea>
        </label>

        <button type="submit" disabled={loading}>{loading ? "Creando..." : "Crear Bitácora"}</button>
      </form>
    </div>
  );
};

export default CreateLog;
