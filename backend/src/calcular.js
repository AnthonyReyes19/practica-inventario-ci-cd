function calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
}

function calcularDescuento(subtotal, porcentaje) {
    return subtotal * (porcentaje / 100);
}

function calcularTotal(precio, cantidad, porcentajeDescuento) {
    const subtotal = calcularSubtotal(precio, cantidad);
    const descuento = calcularDescuento(subtotal, porcentajeDescuento);
    return subtotal - descuento;
}

module.exports = { calcularSubtotal, calcularDescuento, calcularTotal };