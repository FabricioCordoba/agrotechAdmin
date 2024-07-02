
const urlProducts = 'http://localhost:3000/product'


const controller = new AbortController();

export const getProducts = async (urlProducts) => {
    try {
        const res = await fetch(urlProducts, {
            method: 'GET',
            headers: { 'Content-Type': "application/json" },
            signal: controller.signal
        });
        if (!res.ok) throw new Error("Response not ok");
        const products = await res.json();
        return products;
    } catch (err) {
        throw err;
    }
}

export const getProductById = async (id) => {
    try {
        const res = await fetch(`${urlProducts}${id}`, {
            method: "GET",
            headers: { 'Content-Type': "application/json" },
            signal: controller.signal
        });
        if (!res.ok) throw new Error("Response not ok");
        const product = await res.json();
        return product;
    } catch (err) {
        throw err;
    }
}

export const addProduct = async (productData) => {
    try {
        const res = await fetch('http://localhost:3000/product', {
            method: 'POST',
            body: productData
        });

        if (!res.ok) {
            throw new Error('Response not OK');
        }
        const data = await res.json();
        window.location.reload()
        return data;
    } catch (err) {
        console.error('Error en addProduct:', err);
        throw err;
    }
};

export const deleteProduct = async (product) => {
    const productDelete= product;
    try {
        const res = await fetch(`${urlProducts}/${productDelete.idProduct}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error(`Response not OK`)
        const product = await res.json();
        window.location.reload();
        return product
    } catch (err) {
        throw new Error(err);
    }
}


export const updateProductById = async (idProduct, productData) => {
    try {
        const res = await fetch(`http://localhost:3000/product/${idProduct}`, {
            method: 'PATCH',
            body: productData
        });

        if (!res.ok) {
            throw new Error('Response not OK');
        }
        const data = await res.json();
        window.location.reload()
        return data;
    } catch (err) {
        console.error('Error en updateProductById:', err);
        throw err;
    }
};





