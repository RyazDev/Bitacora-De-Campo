// src/Components/LogCard/LogCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './UserCard.css';

const LogCard = ({ log }) => {
  const { title, samplingDate, location, speciesCollected } = log;

  return (
    <div className="log-card-container">
      <div className="log-card-header">
        <h3>{title}</h3>
        <p className="log-card-date">{new Date(samplingDate).toLocaleDateString()}</p>
      </div>
      <div className="log-card-body">
        <p>
          <strong>Ubicación:</strong> Lat: {location.coordinates[1]}, Lng: {location.coordinates[0]}
        </p>
        <p>
          <strong>Especies Colectadas:</strong> {speciesCollected.map((species) => species.scientificName).join(', ')}
        </p>
      </div>
      <div className="log-card-footer">
      </div>
    </div>
  );
};

LogCard.propTypes = {
  log: PropTypes.shape({
    title: PropTypes.string.isRequired,
    samplingDate: PropTypes.string.isRequired,
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
    speciesCollected: PropTypes.arrayOf(
      PropTypes.shape({
        scientificName: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};

export default LogCard;