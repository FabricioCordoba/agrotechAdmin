function TablaCustomerPurchases(){


    return(
        <>
        <table className="clients-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Dia</th>
                        <th>Detalles de Compras</th>
                        <th>Total</th>
                        
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
        
        </>
    )
}