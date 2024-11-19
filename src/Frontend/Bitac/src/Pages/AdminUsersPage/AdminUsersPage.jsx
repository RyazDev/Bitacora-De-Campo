import React, { useEffect, useState } from 'react';
import { fetchUsers, registerUser, updateUser, deleteUser } from '../../Services/apiUser';
import UserForm from '../UserForm/UserForm';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [token, setToken] = useState(''); // Asegúrate de almacenar tu JWT aquí.

    // Cargar usuarios al montar el componente
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersData = await fetchUsers(token);
                setUsers(usersData);
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
            }
        };
        loadUsers();
    }, [token]);

    const handleAddUser = async (userData) => {
        try {
            await registerUser(userData, token);
            const usersData = await fetchUsers(token);
            setUsers(usersData);
        } catch (error) {
            console.error('Error al añadir usuario:', error);
        }
    };

    const handleUpdateUser = async (userData) => {
        try {
            await updateUser(selectedUser._id, userData, token);
            const usersData = await fetchUsers(token);
            setUsers(usersData);
            setIsEditing(false);
            setSelectedUser(null);
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId, token);
            setUsers(users.filter((user) => user._id !== userId));
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditing(true);
    };

    return (
        <div>
            <h1>Administración de Usuarios</h1>
            <UserForm
                onSubmit={isEditing ? handleUpdateUser : handleAddUser}
                user={isEditing ? selectedUser : null}
                setIsEditing={setIsEditing}
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
                                <button onClick={() => handleDeleteUser(user._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsersPage;


