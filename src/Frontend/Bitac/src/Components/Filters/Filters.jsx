import React from "react";
import PropTypes from "prop-types";
import "./Filters.css";

const Filters = ({ filters, onFilterChange, onApplyFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange((prevFilters) => ({
      ...prevFilters, // Mantener los filtros anteriores
      [name]: value,  // Actualizar solo el filtro que cambió
    }));
  };

  const handleApplyFilters = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    onApplyFilters();   // Llamar a la función de aplicar filtros
  };

  return (
    <div className="filters-container">
      <h2 className="filters-title">Filtrar Bitácoras</h2>
      <form className="filters-form" onSubmit={handleApplyFilters}>
        <div className="filter">
          <label htmlFor="startDate">Fecha de Inicio:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="filter">
          <label htmlFor="endDate">Fecha de Fin:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="filter">
          <label htmlFor="location">Ubicación Geográfica:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Ciudad, región..."
            value={filters.location}
            onChange={handleChange}
          />
        </div>

        <div className="filter">
          <label htmlFor="habitatType">Tipo de Hábitat:</label>
          <select
            id="habitatType"
            name="habitatType"
            value={filters.habitatType}
            onChange={handleChange}
          >
            <option value="">Selecciona un hábitat</option>
            <option value="bosque">Bosque</option>
            <option value="desierto">Desierto</option>
            <option value="sabana">Sabana</option>
            <option value="montaña">Montaña</option>
            <option value="agua dulce">Agua dulce</option>
          </select>
        </div>

        <div className="filter">
          <label htmlFor="climate">Clima:</label>
          <select
            id="climate"
            name="climate"
            value={filters.climate}
            onChange={handleChange}
          >
            <option value="">Selecciona un clima</option>
            <option value="tropical">Tropical</option>
            <option value="templado">Templado</option>
            <option value="árido">Árido</option>
            <option value="frío">Frío</option>
            <option value="polar">Polar</option>
          </select>
        </div>

        <div className="apply-filters-button">
          <button type="submit">Aplicar Filtros</button>
        </div>
      </form>
    </div>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    location: PropTypes.string,
    habitatType: PropTypes.string,
    climate: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onApplyFilters: PropTypes.func.isRequired,
};

export default Filters;
