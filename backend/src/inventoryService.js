const productos = [];
let ultimoId = 0;

function crearProducto(data) {
    if (!data.sku || !data.nombre) {
        throw new Error('SKU y nombre son obligatorios');
    }
    const stockInicial = data.stock ?? 0;
    const nuevo = {
        id: ++ultimoId,
        sku: String(data.sku),
        nombre: String(data.nombre),
        stock: Number(stockInicial)
    };
    productos.push(nuevo);
    return nuevo;
}

// --- NUEVA FUNCIÓN PARA EDITAR ---
function actualizarProducto(id, data) {
    const index = productos.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null; // No encontrado

    if (!data.sku || !data.nombre) {
        throw new Error('SKU y nombre son obligatorios');
    }

    productos[index] = {
        ...productos[index],
        sku: String(data.sku),
        nombre: String(data.nombre),
        stock: Number(data.stock ?? productos[index].stock)
    };
    return productos[index];
}

function listarProductos() {
    return [...productos];
}

module.exports = {
    crearProducto,
    listarProductos,
    actualizarProducto // Exportamos la nueva función
};