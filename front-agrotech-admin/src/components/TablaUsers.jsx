import React, { useRef, useState, useContext, useEffect } from 'react';
import { updateUserById, deleteUser } from "../service/userService";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/tablaUsers.css"

function TablaUser({ clients }) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const modalDeleteRef = useRef(null);
    const modalEditRef = useRef(null);

    const [clientUpdate, setClientUpdate] = useState({
        idUser: user?.idUser || '',
        name: user?.name || '',
        lastname: user?.lastname || '',
        phone: user?.phone || '',
        email: user?.email || '',
        address: user?.address || ''
    });

    const [filtroApellido, setFiltroApellido] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 10;
    const totalPages = Math.ceil(clients.length / clientsPerPage);

    useEffect(() => {
        setClientUpdate({
            idUser: user?.idUser || '',
            name: user?.name || '',
            lastname: user?.lastname || '',
            phone: user?.phone || '',
            email: user?.email || '',
            address: user?.address || ''
        });
    }, [user]); 

    function handleChangeEditClient(e) {
        e.preventDefault();
        setClientUpdate(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSaveClick = async () => {
        const updatedClientResponse = await updateUserById(clientUpdate.idUser, clientUpdate);
        return updatedClientResponse;
    };

    const handleEditClick = (client) => {
        setClientUpdate(client);
        modalEditRef.current.showModal();
    };

    const handleDeleteClick = (client) => {
        setClientUpdate(client);
        modalDeleteRef.current.showModal();
    };

    const cancelDeleteModal = () => {
        modalDeleteRef.current.close();
    };

    const confirmDelete = () => {
        deleteUser(clientUpdate);
        modalDeleteRef.current.close();
    };

    const purchases = (idUser) => {
        navigate(`/customer-purchases/${idUser}`);
    };

    const handleFilterByLastName = (e) => {
        setFiltroApellido(e.target.value.toLowerCase());
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const filteredClients = clients.filter(client => client.lastname.toLowerCase().startsWith(filtroApellido));
    const paginatedClients = filteredClients.slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage);

    return (
        
            <div className='general-tabla-users'>
                <div className='container-table-client'>
                    
                        <h1>Listado de clientes</h1>
                    <div className='search-client'>
                    <input
                        className='input-buscar-client'
                        type="text"
                        placeholder="Buscar por apellido..."
                        value={filtroApellido}
                        onChange={handleFilterByLastName}
                    />
                    </div>
                  
                    <table className="clients-table">
                        <thead>
                            <tr>
                                <th>Apellido</th>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Dirección</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                                <th>Historial de compra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedClients.map((user) => (
                                <tr key={user.idUser}>
                                    <td>{user.lastname}</td>
                                    <td>{user.name}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button className='button-edit' onClick={() => handleEditClick(user)}><AiFillEdit /></button>
                                    </td>
                                    <td>
                                        <button className='button-delete' onClick={() => handleDeleteClick(user)}><AiFillDelete /></button>
                                    </td>
                                    <td>
                                        <button className='button-purchase' onClick={() => purchases(user.idUser)}>Historial de Compras</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
                        <span>{currentPage} de {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
                    </div>
                </div>
                {clientUpdate && (
                    <div className='edit-form'>
                        <dialog ref={modalEditRef} id="modalEdit">
                            <h2>Editar cliente</h2>
                            <form action="" method="dialog" id="form">
                                <input
                                    type="text"
                                    name="name"
                                    value={clientUpdate.name}
                                    onChange={handleChangeEditClient}
                                />
                                <input
                                    type="text"
                                    name="lastname"
                                    value={clientUpdate.lastname}
                                    onChange={handleChangeEditClient}
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={clientUpdate.phone}
                                    onChange={handleChangeEditClient}
                                />
                                <input
                                    type="text"
                                    name="email"
                                    value={clientUpdate.email}
                                    onChange={handleChangeEditClient}
                                />
                                <input
                                    type="text"
                                    name="address"
                                    value={clientUpdate.address}
                                    onChange={handleChangeEditClient}
                                />
                                <button className='btn-edit-guardar-users' onClick={handleSaveClick}>Guardar</button>
                                <button className='btn-edit-cancelar-users'>Cancelar</button>
                            </form>
                        </dialog>
                    </div>
                )}
                {clientUpdate && (
                    <dialog ref={modalDeleteRef} id='modalDelete'>
                        <p>¿Desea eliminar al cliente {clientUpdate.name} {clientUpdate.lastname}?</p>
                        <button className='btn-delete-aceptar' onClick={confirmDelete}>Aceptar</button>
                        <button className='btn-delete-cancelar' onClick={cancelDeleteModal}>Cancelar</button>
                    </dialog>
                )}
            </div>
        
    );
}

export default TablaUser;
