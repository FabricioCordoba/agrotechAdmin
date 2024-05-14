import React from "react";
import { useRef, useState, useEffect, useContext } from 'react';
import { updateUserById, deleteUser } from "../service/userService";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { UserContext } from "../context/UserContext";


function TablaUser({ clients }) {
  const { user} = useContext(UserContext);
console.log("user", user);



    const modalDeleteRef = useRef(null);
    const modalEditRef = useRef(null)


    const [clientUpdate, setClientUpdate] = useState({
        idUser: user.idUser,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email,
     
    });

    function handleChangeEditClient(e) {
        e.preventDefault();
        setClientUpdate(prev => ({ ...prev, [e.target.name]: e.target.value }));
        console.log("formulario", clientUpdate);
        return clientUpdate;
    }

    const handleSaveClick = async () => {
        console.log("usuario para guardar", clientUpdate);
        const updatedclientResponse = await updateUserById(clientUpdate.idUser, clientUpdate);
        console.log("guardar", updatedclientResponse);
        return updatedclientResponse;

    };

    const handleEditClick = (client) => {
        setClientUpdate(client);
        modalEditRef.current.showModal();
    };

    const handleDeleteClick = (cliente) => {
        setClientUpdate(cliente);
        modalDeleteRef.current.showModal();
    };

    const cancelDeleteModal = () => {
        modalDeleteRef.current.close(); // Cerrar el modal utilizando la referencia
    };

    const confirmDelete = () => {
        deleteUser(clientUpdate);
        modalDeleteRef.current.close(); // Cerrar el modal después de eliminar el producto
    };

    return (
        <>

            <table className="clients-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Telefono</th>
                        <th>Email</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {clients.map((user) => (
                        <tr key={user.idUser}>
                            <td>{user.name}</td>
                            <td>{user.lastname}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            

                            <td>
                                <button className='button-edit' onClick={() => handleEditClick(user)}><AiFillEdit /></button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteClick(user)}><AiFillDelete /></button>
                            </td>
                            <td>
                                <button>historial de compras</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {clientUpdate && (
                <div className='edit-form'>
                    <dialog ref={modalEditRef} id="modalEdit">
                        <h2>Editar cliente</h2>
                        <form action="" method="dialog" id="form" >
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
                           
                            <button onClick={handleSaveClick}>Guardar</button>
                            <button >Cancelar</button>
                        </form>
                    </dialog>
                </div>
            )}

            {clientUpdate && (
                <dialog ref={modalDeleteRef} id='modalDelete'>
                    <p>¿Desea eliminar al cliente {clientUpdate.name} {clientUpdate.lastname} </p>
                    <button onClick={confirmDelete}>Aceptar</button>
                    <button onClick={cancelDeleteModal}>Cancelar</button>
                </dialog>

            )
            }


        </>
    )
}

export default TablaUser