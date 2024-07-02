import { useRef, useState } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { addProduct, deleteProduct, updateProductById } from '../service/productService';
import "../styles/tabla.css"

function Tabla({ products }) {
    const navigate = useNavigate();
    const modalDeleteRef = useRef(null);
    const modalAddProductRef = useRef(null);
    const modalCsvRef = useRef(null);
    const [productAdd, setProductAdd] = useState();
    const [file, setFile] = useState(null);
    const [productUpdate, setProductUpdate] = useState({
        idProduct: '',
        codeProduct: '',
        product: '',
        description: '',
        price: '',
        category: '',
        amount: '',
        images: ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handleChangeEdit = (e) => {
        e.preventDefault();
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            setProductUpdate(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setProductUpdate(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSaveClick = async () => {
        const formData = new FormData();
        for (const key in productUpdate) {
            formData.append(key, productUpdate[key]);
        }

        try {
            await updateProductById(productUpdate.idProduct, formData);

        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    };

    const handleEditClick = (producto) => {
        setProductUpdate(producto);
        modalEdit.showModal();
    };

    const handleDeleteClick = (product) => {
        setProductUpdate(product);
        modalDeleteRef.current.showModal();
    };

    const cancelDeleteModal = () => {
        modalDeleteRef.current.close();
    };

    const confirmDelete = () => {
        deleteProduct(productUpdate);
        modalDeleteRef.current.close();
    };

    const handleChangeAdd = (e) => {
        e.preventDefault();
        const { name, value, files } = e.target;
        if (files) {
            setProductAdd(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setProductAdd(prev => ({ ...prev, [name]: value }));
        }
    };


    const handleAddClick = (productAdd) => {
        setProductAdd(productAdd);
        modalAddProductRef.current.showModal();
    };

    const cancelAddModal = () => {
        modalAddProductRef.current.close();
    };

    const confirmAdd = async () => {
        const formData = new FormData();
        for (const key in productAdd) {
            formData.append(key, productAdd[key]);
        }

        try {
            await addProduct(formData);
            modalAddProductRef.current.close();
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    };


    const handleAddCsv = () => {
        modalCsvRef.current.showModal();
    };

    const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Obtener el primer archivo seleccionado por el usuario
        setArchivoSeleccionado(file); // Actualizar el estado con el archivo seleccionado
    };

    const handleUpload = async () => {
        if (!archivoSeleccionado) {
            console.error('No se ha seleccionado ningún archivo.');
            return;
        }
        console.log(archivoSeleccionado);
        const formData = new FormData();
        formData.append('file', archivoSeleccionado);

        try {
            const response = await fetch('http://localhost:3000/product/upload', {
                method: 'POST',
                body: formData,
            });
            console.log(formData);
            if (!response.ok) {
                throw new Error('Error al cargar el archivo');
            }

            const data = await response.json();
            console.log('Archivo cargado correctamente:', data);
            // Aquí puedes manejar la respuesta del servidor si es necesario
        } catch (error) {
            console.error('Error al cargar el archivo:', error);
            // Aquí puedes manejar el error si es necesario
        }
    };

    const cancelAddCsvModal = () => {
        modalCsvRef.current.close();
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

    const paginatedProducts = products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    return (
        <div className='general-table'>
            <div className="table-container">
                <h1>Lista de Productos</h1>
                <div className='btn-adds'>
                    <button className='btn-add-product' onClick={() => handleAddClick(productAdd)}>Agregar Producto</button>
                    <button className='btn-add-csv' onClick={handleAddCsv}>Agregar CSV</button>
                </div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Categoría</th>
                            <th>Stock</th>
                            <th>Imagen</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedProducts.map((product) => (
                            <tr key={product.idProduct}>
                                <td>{product.codeProduct}</td>
                                <td>{product.product}</td>
                                <td>{product.description}</td>
                                <td>{Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)}</td>
                                <td>{product.category}</td>

                                <td style={{ color: product.amount <= 5 ? 'red' : 'black', fontSize: product.amount <= 5 ? 30 : '20px'  }}>
                                    {product.amount}
                                </td>

                                <td><img src={product.images} alt={product.product} width="50" /></td>
                                <td>
                                    <button className='button-edit' onClick={() => handleEditClick(product)}><AiFillEdit /></button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteClick(product)}><AiFillDelete /></button>
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
            {productUpdate && (
                <dialog id="modalEdit">
                    <h2>Editar Producto</h2>
                    <form action="" method="dialog" id="form">
                        <input
                            type="text"
                            name="codeProduct"
                            value={productUpdate.codeProduct}
                            onChange={handleChangeEdit}
                        />
                        <input
                            type="text"
                            name="product"
                            value={productUpdate.product}
                            onChange={handleChangeEdit}
                        />
                        <input
                            type="text"
                            name="description"
                            value={productUpdate.description}
                            onChange={handleChangeEdit}
                        />
                        <input
                            type="number"
                            name="price"
                            value={productUpdate.price}
                            onChange={handleChangeEdit}
                        />
                        <select
                            type="text"
                            name="category"
                            onChange={handleChangeEdit}
                            value={productUpdate.category}
                        >
                            <option value="Ferreteria">Ferretería</option>
                            <option value="Ropa de trabajo">Ropa de trabajo</option>
                            <option value="Tranqueras">Tranqueras</option>
                            <option value="Repuestos agricolas">Repuestos agrícolas</option>
                            <option value="Equipamiento vehículos">Equipamiento vehículos</option>
                            <option value="Pulverizacío">Pulverización</option>
                            <option value="Construcción">Construcción</option>
                            <option value="Infraestructura">Infraestructura</option>
                            <option value="Energias renovables">Energías renovables</option>
                            <option value="Maquinaria agrícola">Maquinaria agrícola</option>
                            <option value="Forestación y Jardinería">Forestación y Jardinería</option>
                            <option value="Agricultura de precision">Agricultura de precisión</option>
                        </select>
                        <input
                            type="number"
                            name="amount"
                            value={productUpdate.amount}
                            onChange={handleChangeEdit}
                        />
                        <input
                            type="file"
                            name='images'
                            onChange={handleChangeEdit}
                        />
                        <button className='btn-edit-guardar' onClick={handleSaveClick}>Guardar</button>
                        <button className='btn-edi-cancelar'>Cancelar</button>
                    </form>
                </dialog>
            )}
            {productUpdate && (
                <dialog ref={modalDeleteRef} id='modalDelete' className='modal-delete-product'>
                    <p>¿Desea eliminar el producto {productUpdate.product}?</p>
                    <button className='btn-delete-aceptar' onClick={confirmDelete}>Aceptar</button>
                    <button className='btn-delete-cancelar' onClick={cancelDeleteModal}>Cancelar</button>
                </dialog>
            )}
            {products && (
                <dialog ref={modalAddProductRef} id='modalAddProduct'>
                    <form action="" method="dialog" id="formAdd">
                        <input
                            type="text"
                            name="product"
                            placeholder='Nombre Producto'
                            onChange={handleChangeAdd}
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder='Descripción'
                            onChange={handleChangeAdd}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder='Precio'
                            onChange={handleChangeAdd}
                        />
                        <select
                            type="text"
                            name="category"
                            onChange={handleChangeAdd}
                        >
                            <option value="Ferreteria">Ferretería</option>
                            <option value="Ropa de trabajo">Ropa de trabajo</option>
                            <option value="Tranqueras">Tranqueras</option>
                            <option value="Repuestos agricolas">Repuestos agricolas</option>
                            <option value="Equipamiento vehículos">Equipamiento vehículos</option>
                            <option value="Pulverizacío">Pulverización</option>
                            <option value="Construcción">Construcción</option>
                            <option value="Infraestructura">Infraestructura</option>
                            <option value="Energias renovables">Energías renovables</option>
                            <option value="Maquinaria agrícola">Maquinaria agrícola</option>
                            <option value="Forestación y Jardinería">Forestación y Jardinería</option>
                            <option value="Agricultura de precision">Agricultura de precisión</option>
                        </select>
                        <input
                            type="number"
                            name="amount"
                            placeholder='Stock'
                            onChange={handleChangeAdd}
                        />
                        <input
                            type="file"
                            name="images"
                            placeholder='Imagen'
                            className='produc-edit-img'
                            onChange={handleChangeAdd}
                        />
                        <button className='btn-modal-add-product-aceptar' onClick={confirmAdd}>Guardar</button>
                        <button className='btn-modal-add-product-cancelar' onClick={cancelAddModal}>Cancelar</button>
                    </form>
                </dialog>
            )}
            <dialog ref={modalCsvRef} id='modalCsv'>
                <form action="" method="dialog" id="formAddCsv">
                    <input type="file" onChange={handleFileChange} />
                    <p>Subi un archivo CSV </p>
                    <button className='btn-modal-add-csv-aceptar' onClick={handleUpload}>Aceptar</button>
                    <button className='btn-modal-add-csv-cancelar' onClick={cancelAddCsvModal}>Cancelar</button>
                </form>
            </dialog>
        </div>
    );
}

export default Tabla;
