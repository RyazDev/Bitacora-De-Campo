const API_BASE_URL = 'http://localhost:5000/api/logs';

// Obtener el token de autenticación desde el localStorage
const getAuthToken = () => {
  const token = localStorage.getItem('token'); // Asegúrate de que el token se guarda como 'token'
  if (!token) {
    throw new Error('No se ha encontrado un token de autenticación');
  }
  return token;
};

// Crear una nueva bitácora
const createLog = async (logData) => {
  try {
    const token = getAuthToken();
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(logData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear la bitácora');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Error en la operación de crear la bitácora');
  }
};

// Obtener todas las bitácoras
const getLogs = async () => {
  try {
    const token = getAuthToken();
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener las bitácoras');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Error al realizar la solicitud de bitácoras');
  }
};

// Obtener una bitácora por ID
const getLogById = async (id) => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener la bitácora');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Error al realizar la solicitud de bitácora');
  }
};

// Buscar bitácoras con filtros
const searchLogs = async (filters) => {
  try {
    if (!filters || Object.keys(filters).length === 0) {
      throw new Error('No se han proporcionado filtros válidos');
    }

    const token = getAuthToken();
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE_URL}/search?${query}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al buscar las bitácoras');
    }

    const data = await response.json();
    if (!data || data.length === 0) {
      throw new Error('No se encontraron bitácoras con esos filtros');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error al realizar la búsqueda de bitácoras');
  }
};

// Actualizar una bitácora existente
const updateLog = async (logId, logData) => {
  try {
    if (!logId) {
      throw new Error('Se debe proporcionar un ID de bitácora válido');
    }

    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/${logId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(logData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar la bitácora');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Error en la operación de actualización de la bitácora');
  }
};

// Eliminar una bitácora
const deleteLog = async (logId) => {
  try {
    if (!logId) {
      throw new Error('Se debe proporcionar un ID de bitácora válido');
    }

    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/${logId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al eliminar la bitácora');
    }

    // Si la respuesta es 204 No Content, simplemente devolver el mensaje de éxito
    if (response.status === 204) {
      return { message: 'Bitácora eliminada correctamente' };
    }

    // En caso de que haya contenido en la respuesta, procesarlo
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Error en la operación de eliminación de la bitácora');
  }
};

const apiClient = {
  createLog,
  getLogs,
  searchLogs,
  updateLog,
  deleteLog,
  getLogById
};

export default apiClient;
