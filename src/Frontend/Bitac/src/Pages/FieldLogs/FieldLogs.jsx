import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogCard from "../../Components/UserCard/UserCard";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Filters from "../../Components/Filters/Filters";
import ExportData from "../../Components/ExportData/ExportData";
import CreateLogButton from "../../Components/CreateBitacoraButton/CreateBitacoraButton";
import apiClient from "../../Services/apiClient";
import { FaTrash } from 'react-icons/fa'; 
import "./FieldLogs.css";

const FieldLogs = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    location: "",
    habitatType: "",
    climate: "",
    orderBy: "date",
    latitude: "",
    longitude: "",
    species: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const filterLogsBySearch = async () => {
    setLoading(true);
    setError(null);

    const validLatitude = filters.latitude && !isNaN(filters.latitude);
    const validLongitude = filters.longitude && !isNaN(filters.longitude);

    const params = {
      title: searchTerm ? searchTerm : undefined,
      date: filters.startDate && filters.endDate ? `${filters.startDate}:${filters.endDate}` : undefined,
      latitude: validLatitude ? filters.latitude : undefined,
      longitude: validLongitude ? filters.longitude : undefined,
      species: filters.species || undefined,
    };

    const filteredParams = Object.fromEntries(Object.entries(params).filter(([key, value]) => value !== undefined));

    if (Object.keys(filteredParams).length === 0) {
      setError("Por favor, ingresa criterios de búsqueda válidos.");
      setLoading(false);
      return;
    }

    try {
      const data = await apiClient.searchLogs(filteredParams);
      setLogs(data);
    } catch (error) {
      setError("Error al buscar los logs. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.getLogs();
      setLogs(data);
    } catch (error) {
      setError("Error al cargar los logs. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLog = async (logId) => {
    try {
      await apiClient.deleteLog(logId); 
      setLogs((prevLogs) => {
        const updatedLogs = prevLogs.filter((log) => log._id !== logId);
        return updatedLogs; 
      });
  
      alert("Bitácora eliminada correctamente.");
    } catch (error) {
      alert("Error al eliminar la bitácora. Intenta nuevamente.");
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleRefreshLogs = () => {
    fetchLogs();
  };

  useEffect(() => {
    if (searchTerm) {
      filterLogsBySearch();
    } else {
      fetchLogs();
    }
  }, [searchTerm]);

  return (
    <div className="field-logs-container">
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearchChange} />
      </div>

      <div className="filters-container">
        <Filters filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div className="refresh-button-container">
        <button className="refresh-logs-button" onClick={handleRefreshLogs}>
          Actualizar Lista
        </button>
      </div>

      <div className="create-log-button-container">
        <CreateLogButton />
      </div>

      {loading ? (
        <div className="loading-spinner">
          <p>Cargando logs...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : (
        <div className="logs-list">
          {logs.length > 0 ? (
            logs.map((log) => (
              <div key={log._id} className="log-card-container">
                <LogCard log={log} />
                <Link to={`/log/${log._id}`}>
                  <button>Ver Detalles</button>
                </Link>
                <button
                  className="delete-log-button"
                  onClick={() => handleDeleteLog(log._id)}
                >
                  <FaTrash /> Eliminar
                </button>
              </div>
            ))
          ) : (
            <p>No se encontraron logs.</p>
          )}
        </div>
      )}

      <div className="export-data-container">
        <ExportData bitacoras={logs} />
      </div>
    </div>
  );
};

export default FieldLogs;
