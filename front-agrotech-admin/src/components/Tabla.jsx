import { useRef, useState } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { addProduct, deleteProduct, updateProductById } from '../service/productService';
import { product } from '../service/product';
// import "../styles/tabla.css"

function Tabla({ products }) {

    const navigate = useNavigate();

    const modalDeleteRef = useRef(null);
    const modalAddProductRef = useRef(null);
    const modalCsvRef = useRef(null);
    const [productAdd, setProductAdd] = useState();
    const [file, setFile] = useState(null);
    const [productUpdate, setProductUpdate] = useState({
        idProduct: product.idProduct,
        codeProduct: product.codeProduct,
        product: product.product,
        description: product.description,
        price: product.price,
        category: product.category,
        amount: product.amount,
        images: product.images
    });

    function handleChangeEdit(e) {
        e.preventDefault();
        setProductUpdate(prev => ({ ...prev, [e.target.name]: e.target.value }));
        return productUpdate;
    }

    const handleSaveClick = async () => {
        const updatedProductResponse = await updateProductById(productUpdate.idProduct, productUpdate);
        return updatedProductResponse;
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
        modalDeleteRef.current.close(); // Cerrar el modal utilizando la referencia
    };

    const confirmDelete = () => {
        deleteProduct(productUpdate);
        modalDeleteRef.current.close(); // Cerrar el modal después de eliminar el producto
    };

    //---------------------------------------------------------------------------------------------------------------------------
    function handleChangeAdd(e) {
        e.preventDefault();
        setProductAdd(prev => ({ ...prev, [e.target.name]: e.target.value }));
        return productAdd;
    }

    const handleAddClick = (productAdd) => {
        setProductAdd(productAdd);
        modalAddProductRef.current.showModal();
    };

    const canceAddlModal = () => {
        modalAddProductRef.current.close(); // Cerrar el modal utilizando la referencia
    };

    const confirmarAdd = async () => {
        const productAddResponse = await addProduct(productAdd);
        return productAddResponse;
    };
    //---------------------------------------------------------------------------------------------------------------------------------
    const handleAddCsv = () => {
        modalCsvRef.current.showModal();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:3001/product/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al cargar el archivo');
            }

            const data = await response.json();
        } catch (error) {
            console.error('Error al cargar el archivo:', error);
        }
    };

    const canceAddCsvlModal = () => {
        modalCsvRef.current.close(); // Cerrar el modal utilizando la referencia
    };

    return (
        <section className='layout'>
            <div className="table-container">
                <h1>Lista de Productos</h1>

                <div>
                    <button onClick={() => handleAddClick(productAdd)}>Argregar Producto</button>
                    <button onClick={handleAddCsv}>Agregar CSV</button>
                </div>

                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Productos</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Categoria</th>
                            <th>Cantidad disponible</th>
                            <th>Imagen</th>
                            <th>Modificar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.idProduct}>
                                <td>{product.codeProduct}</td>
                                <td>{product.product}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.amount}</td>
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
            </div>
            {productUpdate && (
                <div className='edit-form'>
                    <dialog id="modalEdit">
                        <h2>Editar Producto</h2>
                        <form action="" method="dialog" id="form" >
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

                            <select type="text"
                                name="category"

                                onChange={handleChangeEdit}>
                                <option value="Ferretería">Ferretería</option>
                                <option value="Ropa de trabajo">Ropa de trabajo</option>
                                <option value="Tranqueras">Tranqueras</option>
                                <option value="Repuestos agricolas">Repuestos agricolas</option>
                                <option value="Equipamiento vehículos">Equipamiento vehículos</option>
                                <option value="Pulverizacío">Pulverizacío</option>
                                <option value="Construcción">Construcción</option>
                                <option value="Infraestructura">Infraestructura</option>
                                <option value="Energias renovables">Energias renovables</option>
                                <option value="Maquinaria agrícola">Maquinaria agrícola</option>
                                <option value="Forestación y Jardinería">Forestación y Jardinería</option>
                                <option value="Agricultura de precision">Agricultura de precision</option>

                            </select>

                            <input
                                type="number"
                                name="amount"
                                value={productUpdate.amount}
                                onChange={handleChangeEdit}
                            />
                            <input
                                type="text"
                                name='images'
                                value={productUpdate.images}
                                onChange={handleChangeEdit}
                            />
                            <button onClick={handleSaveClick}>Guardar</button>
                            <button >Cancelar</button>
                        </form>
                    </dialog>
                </div>
            )}

            {productUpdate && (
                <dialog ref={modalDeleteRef} id='modalDelete'>
                    <p>¿Desea eliminar el producto {productUpdate.product}?</p>
                    <button onClick={confirmDelete}>Aceptar</button>
                    <button onClick={cancelDeleteModal}>Cancelar</button>
                </dialog>

            )
            }

            {product && (
                <dialog ref={modalAddProductRef} id='modalAddProduct'>
                    <form action="" method="dialog" id="formAdd" >

                        <input
                            type="text"
                            name="product"
                            placeholder='Nombre Producto'
                            onChange={handleChangeAdd}
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder='Descripcion'
                            onChange={handleChangeAdd}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder='Precio'
                            onChange={handleChangeAdd}
                        />
                        <select type="text"
                            name="category"

                            onChange={handleChangeAdd}>
                            <option value="Ferretería">Ferretería</option>
                            <option value="Ropa de trabajo">Ropa de trabajo</option>
                            <option value="Tranqueras">Tranqueras</option>
                            <option value="Repuestos agricolas">Repuestos agricolas</option>
                            <option value="Equipamiento vehículos">Equipamiento vehículos</option>
                            <option value="Pulverizacío">Pulverizacío</option>
                            <option value="Construcción">Construcción</option>
                            <option value="Infraestructura">Infraestructura</option>
                            <option value="Energias renovables">Energias renovables</option>
                            <option value="Maquinaria agrícola">Maquinaria agrícola</option>
                            <option value="Forestación y Jardinería">Forestación y Jardinería</option>
                            <option value="Agricultura de precision">Agricultura de precision</option>

                        </select>

                        <input
                            type="number"
                            name="amount"
                            placeholder='stock'
                            onChange={handleChangeAdd}
                        />
                        <input
                            type="text"
                            name="images"
                            placeholder='imagen'
                            onChange={handleChangeAdd}
                        />
                        <button onClick={confirmarAdd}>Guardar</button>
                        <button onClick={canceAddlModal}>Cancelar</button>
                    </form>

                </dialog>
            )};
            <dialog ref={modalCsvRef} id='modalCsv'>
                <form action="" method="dialog" id="formAddCsv">
                    <input type="file" onChange={handleFileChange} />
                    <p>Subi un archivo CSV </p>
                    <button onClick={handleUpload}>Aceptar</button>
                    <button onClick={canceAddCsvlModal}>Cancelar</button>

                </form>

            </dialog>
        </section>
    );
}

export default Tabla;
