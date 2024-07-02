import React, { useContext, useEffect, useState } from 'react';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { UserContext } from "../context/UserContext";
import "../styles/ventas.css";

const Ventas = () => {
    const { clients } = useContext(UserContext);
    const [ventas, setVentas] = useState([]);
    const [filteredVentas, setFilteredVentas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtroTiempo, setFiltroTiempo] = useState('todos');
    const [filtroProducto, setFiltroProducto] = useState('');
    const [filtroFechaInicio, setFiltroFechaInicio] = useState(new Date());
    const [filtroFechaFin, setFiltroFechaFin] = useState(new Date());
    const [totalVentas, setTotalVentas] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const productosPerPage = 10;

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await fetch('http://localhost:3000/invoices');
                if (!response.ok) {
                    throw new Error('Failed to fetch ventas');
                }
                const data = await response.json();
                setVentas(data);
                setFilteredVentas(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVentas();
    }, []);

    useEffect(() => {
        calcularTotalVentas();
    }, [filtroTiempo, filtroFechaInicio, filtroFechaFin, filtroProducto, ventas]);

    const calcularTotalVentas = () => {
        let total = 0;
        let ventasFiltradas = [];

        switch (filtroTiempo) {
            case 'dia':
                ventasFiltradas = ventas.filter(venta => {
                    const fechaVenta = new Date(venta.invoiceDate);
                    return fechaVenta >= startOfDay(filtroFechaInicio) && fechaVenta <= endOfDay(filtroFechaInicio);
                });
                break;
            case 'semana':
                ventasFiltradas = ventas.filter(venta => {
                    const fechaVenta = new Date(venta.invoiceDate);
                    return fechaVenta >= startOfWeek(filtroFechaInicio, { weekStartsOn: 1 }) && fechaVenta <= endOfWeek(filtroFechaFin, { weekStartsOn: 1 });
                });
                break;
            case 'mes':
                ventasFiltradas = ventas.filter(venta => {
                    const fechaVenta = new Date(venta.invoiceDate);
                    return fechaVenta >= startOfMonth(filtroFechaInicio) && fechaVenta <= endOfMonth(filtroFechaInicio);
                });
                break;
            default:
                ventasFiltradas = ventas;
                break;
        }

        // Aplicar filtro por producto después del filtro de tiempo
        if (filtroProducto) {
            ventasFiltradas = ventasFiltradas.filter(venta =>
                venta.invoiceDetails.some(detalle =>
                    detalle.product.product.toLowerCase().includes(filtroProducto.toLowerCase())
                )
            );
        }

        ventasFiltradas.forEach(venta => {
            total += venta.total_with_iva;
        });

        setTotalVentas(total);
        setFilteredVentas(ventasFiltradas);
        setCurrentPage(1); // Resetear la página actual cuando se aplica un nuevo filtro
    };

    const handleFiltroProductoChange = (event) => {
        setFiltroProducto(event.target.value);
    };

    const handleFechaInicioChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const localDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);
        setFiltroFechaInicio(localDate);
    };

    const handleFechaFinChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const localDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);
        setFiltroFechaFin(localDate);
    };

    const totalProducts = filteredVentas.reduce((acc, venta) => acc + venta.invoiceDetails.length, 0);
    const totalPages = Math.ceil(totalProducts / productosPerPage);

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

    const paginatedVentas = filteredVentas.reduce((acc, venta) => {
        venta.invoiceDetails.forEach(detalle => {
            if (detalle.product.product.toLowerCase().includes(filtroProducto.toLowerCase())) {
                acc.push({ ...detalle, invoiceDate: venta.invoiceDate });
            }
            
        });

        return acc;

    }, []).slice((currentPage - 1) * productosPerPage, currentPage * productosPerPage);

    return (
        <>
            <div className='general-ventas'>
                <h1>Registro de Ventas</h1>
                <div className='input-filtros-tiempo'>
                    <label htmlFor="filtroTiempo">Filtrar por Tiempo:</label>
                    <select id="filtroTiempo" value={filtroTiempo} onChange={(e) => setFiltroTiempo(e.target.value)}>
                        <option value="todos">Todos</option>
                        <option value="dia">Día</option>
                        <option value="semana">Semana</option>
                        <option value="mes">Mes</option>
                    </select>
                </div>
                <div className='filtro-por-producto'>
                    <label htmlFor="filtroProducto">Filtrar por Producto:</label>
                    <input type="text" id="filtroProducto" value={filtroProducto} onChange={handleFiltroProductoChange} />
                </div>
                {filtroTiempo === 'dia' && (
                    <div className='filtro-dia'>
                        <label htmlFor="fechaInicio">Fecha:</label>
                        <input type="date" id="fechaInicio" value={filtroFechaInicio.toISOString().substring(0, 10)} onChange={handleFechaInicioChange} />
                    </div>
                )}
                {filtroTiempo === 'semana' && (
                    <div className='filtro-semana'>
                        <label htmlFor="fechaInicio">Inicio de semana:</label>
                        <input type="date" id="fechaInicio" value={filtroFechaInicio.toISOString().substring(0, 10)} onChange={handleFechaInicioChange} />
                        <label htmlFor="fechaFin">Fin de semana:</label>
                        <input type="date" id="fechaFin" value={filtroFechaFin.toISOString().substring(0, 10)} onChange={handleFechaFinChange} />
                    </div>
                )}
                {filtroTiempo === 'mes' && (
                    <div className='flitro-mes'>
                        <label htmlFor="fechaInicio">Mes y Año:</label>
                        <input type="month" id="fechaInicio" value={filtroFechaInicio.toISOString().substring(0, 7)} onChange={handleFechaInicioChange} />
                    </div>
                )}
                {filtroTiempo !== 'todos' && (
                    <div className='recaudado'>
                        <h3>Total recaudado: {Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(totalVentas)}</h3>
                    </div>
                )}
                <table className='tabla-ventas'>
                    <thead >
                        <tr>
                            <th>Fecha de Venta</th>
                            <th>Producto</th>
                            <th>Cantidad Vendida</th>
                            <th>Precio</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedVentas.map((detalle, index) => (

                            <tr key={`${detalle.id}-${index}`}>
                                <td className='celda'>{new Date(detalle.invoiceDate).toLocaleDateString()}</td>
                                <td className='celda'>{detalle.product.product}</td>
                                <td className='celda'>{detalle.amount_sold}</td>
                                <td className='celda'>{Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(detalle.product.price)}</td>
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
        </>
    );
};

export default Ventas;
    