import React, { useState, useEffect } from 'react';
import './UserForm.css';  // Importa el archivo CSS de la forma correcta
import UserForm from './UserForm';  // Importa el componente UserForm

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // Código para cargar usuarios desde la API
  };

  const handleCreateOrUpdate = async (data) => {
    // Código para crear o actualizar usuario
    if (isEditing) {
      // Actualizar
    } else {
      // Crear
    }
    fetchUsers(); // Recarga usuarios después de la acción
    setIsEditing(false);
    setSelectedUser(null);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    // Código para eliminar usuario
    fetchUsers(); // Recarga usuarios
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <UserForm
        onSubmit={handleCreateOrUpdate}
        initialData={selectedUser}
        isEditing={isEditing}
      />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button onClick={() => handleDelete(user._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;