// src/Components/CreateLogButton/CreateLogButton.jsx

import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./CreateBitacoraButton.css"; 

const CreateLogButton = ({ text }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/createlog");
  };

  return (
    <button
      className="create-log-button"
      onClick={handleClick}
      aria-label="Crear nueva bitácora"
    >
      {text || "Crear Bitácora"}
    </button>
  );
};

CreateLogButton.propTypes = {
  text: PropTypes.string, 
};

export default CreateLogButton;