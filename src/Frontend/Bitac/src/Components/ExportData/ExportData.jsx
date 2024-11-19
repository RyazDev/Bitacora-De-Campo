import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';  // Importar la extensión de autoTable
import PropTypes from 'prop-types';

const ExportData = ({ bitacoras }) => {
  const [format, setFormat] = useState('csv');

  const handleExportCSV = () => {
    const csvData = bitacoras.map((log) => {
      const date = new Date(log.samplingDate);
      const formattedDate = !isNaN(date) ? date.toLocaleDateString() : 'Fecha no disponible';
      return {
        title: log.title,
        date: formattedDate,
        location: `${log.location.coordinates[1]}, ${log.location.coordinates[0]}`,
        weatherConditions: log.weatherConditions || 'No disponible',
        habitatDescription: log.habitatDescription || 'No disponible',
        species: log.speciesCollected.map((species) => species.scientificName).join(', '),
        additionalNotes: log.additionalNotes || 'No disponible',
      };
    });

    const csvString = [
      ['Title', 'Date', 'Location', 'Weather Conditions', 'Habitat Description', 'Species', 'Additional Notes'],
      ...csvData.map((log) => [
        log.title,
        log.date,
        log.location,
        log.weatherConditions,
        log.habitatDescription,
        log.species,
        log.additionalNotes,
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'bitacoras.csv';
    link.click();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageMargin = 10;
    const lineHeight = 10;
    const header = ['Título', 'Fecha', 'Ubicación', 'Condiciones Climáticas', 'Especies', 'Notas Adicionales'];

    doc.setFontSize(16);
    doc.text('Bitácoras de Campo', 20, 20);
    doc.setFontSize(12);

    bitacoras.forEach((log, index) => {
      if (index > 0) doc.addPage(); // Agregar página nueva si no es la primera bitácora

      doc.text(`Bitácora ${index + 1}`, 20, 30);

      const date = new Date(log.samplingDate);
      const formattedDate = !isNaN(date) ? date.toLocaleDateString() : 'Fecha no disponible';
      const location = `${log.location.coordinates[1]}, ${log.location.coordinates[0]}`;
      const weather = log.weatherConditions || 'No disponible';
      const species = log.speciesCollected.map((species) => species.scientificName).join(', ') || 'No disponible';
      const additionalNotes = log.additionalNotes || 'No disponible';

      // Datos de la bitácora
      const data = [
        [log.title, formattedDate, location, weather, species, additionalNotes],
      ];

      // Generar tabla con autoTable
      doc.autoTable({
        startY: 40,
        head: [header],
        body: data,
        margin: { top: pageMargin },
        theme: 'grid',  // Estilo de tabla con líneas
      });

      // Si hay más contenido adicional (Descripción del hábitat, etc.)
      const habitatDescription = log.habitatDescription || 'No disponible';
      doc.text(`Descripción del Hábitat: ${habitatDescription}`, 20, doc.lastAutoTable.finalY + lineHeight);
      doc.text(`Notas Adicionales: ${additionalNotes}`, 20, doc.lastAutoTable.finalY + 2 * lineHeight);
    });

    doc.save('bitacoras.pdf');
  };

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
  };

  return (
    <div className="export-container">
      <h3>Exportar Datos de las Bitácoras</h3>
      <div className="export-options">
        <label>
          Seleccionar formato:
          <select onChange={handleFormatChange} value={format}>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </select>
        </label>
        <button
          className="export-btn"
          onClick={format === 'csv' ? handleExportCSV : handleExportPDF}
        >
          Exportar
        </button>
      </div>
    </div>
  );
};

ExportData.propTypes = {
  bitacoras: PropTypes.array.isRequired,
};

export default ExportData;