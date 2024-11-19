import React, { useState } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css"; 

const SearchBar = ({ onSearch }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [species, setSpecies] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const filters = {
      title: title || undefined,
      date: date || undefined,
      latitude: latitude || undefined,
      longitude: longitude || undefined,
      species: species || undefined,
    };

    onSearch(filters);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar por título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="search-input"
        />
        <input
          type="date"
          placeholder="Buscar por fecha"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Latitud"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Longitud"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Buscar por especie"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, 
};

export default SearchBar;
