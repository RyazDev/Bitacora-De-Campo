import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../Services/apiClient";
import { FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import "./LogDetails.css";

const LogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedLog, setUpdatedLog] = useState({});

  useEffect(() => {
    const fetchLogDetails = async () => {
      try {
        const data = await apiClient.getLogById(id);
        setLog(data);
        setUpdatedLog(data);
      } catch (err) {
        setError("No se pudieron cargar los detalles de la bitácora.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogDetails();
  }, [id]);

  const handleInputChange = (field, value) => {
    setUpdatedLog({ ...updatedLog, [field]: value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await apiClient.updateLog(id, updatedLog);
      setLog(updatedLog);
      setIsEditing(false);
    } catch (err) {
      setError("Error al guardar los cambios. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un campo específico (ej. una especie)
  const handleDeleteField = (index) => {
    const updatedSpecies = [...updatedLog.speciesCollected];
    updatedSpecies.splice(index, 1); // Elimina el campo en el índice
    setUpdatedLog({ ...updatedLog, speciesCollected: updatedSpecies });
  };

  if (loading) {
    return <p className="loading-message">Cargando detalles...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="log-details-container">
      <h2 className="log-title">Detalles de la Bitácora</h2>
      {log ? (
        <div className="log-details">
          <div className="edit-actions">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="edit-button">
                <FaEdit /> Editar
              </button>
            ) : (
              <>
                <button onClick={handleSave} className="save-button">
                  <FaSave /> Guardar
                </button>
                <button onClick={() => setIsEditing(false)} className="cancel-button">
                  <FaTimes /> Cancelar
                </button>
              </>
            )}
          </div>

          <h3>
            {isEditing ? (
              <input
                type="text"
                value={updatedLog.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            ) : (
              log.title || "Sin título"
            )}
          </h3>

          <p>
            <strong>Fecha de Muestreo:</strong>{" "}
            {isEditing ? (
              <input
                type="date"
                value={updatedLog.samplingDate || ""}
                onChange={(e) => handleInputChange("samplingDate", e.target.value)}
              />
            ) : (
              new Date(log.samplingDate).toLocaleDateString()
            )}
          </p>

          <p>
            <strong>Ubicación:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={updatedLog.location?.coordinates.join(", ") || ""}
                onChange={(e) =>
                  handleInputChange(
                    "location",
                    { ...updatedLog.location, coordinates: e.target.value.split(",").map(Number) }
                  )
                }
              />
            ) : (
              `${log.location?.coordinates[0]}, ${log.location?.coordinates[1]}`
            )}
          </p>

          <p>
            <strong>Condiciones Climáticas:</strong>{" "}
            {isEditing ? (
              <textarea
                value={updatedLog.weatherConditions || ""}
                onChange={(e) => handleInputChange("weatherConditions", e.target.value)}
              />
            ) : (
              log.weatherConditions || "No especificadas"
            )}
          </p>

          <p>
            <strong>Descripción del Hábitat:</strong>{" "}
            {isEditing ? (
              <textarea
                value={updatedLog.habitatDescription || ""}
                onChange={(e) => handleInputChange("habitatDescription", e.target.value)}
              />
            ) : (
              log.habitatDescription || "No especificada"
            )}
          </p>

          <h4>Especies Recogidas:</h4>
          <ul className="species-list">
            {log.speciesCollected.map((species, index) => (
              <li key={index} className="species-item">
                <p>
                  <strong>Nombre Científico:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={updatedLog.speciesCollected[index]?.scientificName || ""}
                      onChange={(e) => {
                        const newSpecies = [...updatedLog.speciesCollected];
                        newSpecies[index].scientificName = e.target.value;
                        handleInputChange("speciesCollected", newSpecies);
                      }}
                    />
                  ) : (
                    species.scientificName || "No especificado"
                  )}
                </p>
                <p>
                  <strong>Nombre Común:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={updatedLog.speciesCollected[index]?.commonName || ""}
                      onChange={(e) => {
                        const newSpecies = [...updatedLog.speciesCollected];
                        newSpecies[index].commonName = e.target.value;
                        handleInputChange("speciesCollected", newSpecies);
                      }}
                    />
                  ) : (
                    species.commonName || "No especificado"
                  )}
                </p>
                <p>
                  <strong>Cantidad Recogida:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="number"
                      value={updatedLog.speciesCollected[index]?.quantity || ""}
                      onChange={(e) => {
                        const newSpecies = [...updatedLog.speciesCollected];
                        newSpecies[index].quantity = e.target.value;
                        handleInputChange("speciesCollected", newSpecies);
                      }}
                    />
                  ) : (
                    species.quantity || "No especificada"
                  )}
                </p>
                <p>
                  <strong>Notas:</strong>{" "}
                  {isEditing ? (
                    <textarea
                      value={updatedLog.speciesCollected[index]?.notes || ""}
                      onChange={(e) => {
                        const newSpecies = [...updatedLog.speciesCollected];
                        newSpecies[index].notes = e.target.value;
                        handleInputChange("speciesCollected", newSpecies);
                      }}
                    />
                  ) : (
                    species.notes || "Sin notas"
                  )}
                </p>
                {/* Botón de eliminar para cada especie */}
                <button
                  onClick={() => handleDeleteField(index)}
                  className="delete-field-button"
                >
                  <FaTrash /> Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se encontraron detalles para esta bitácora.</p>
      )}
    </div>
  );
};

export default LogDetails;
