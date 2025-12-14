import { useEffect, useState } from "react";
import './App.css'

const API_URL = 'http://localhost:3000/api/productos';

function App() {
  const [productos, setProductos] = useState([]);
  const [sku, setSku] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  
  // Estado para saber si estamos editando (guardamos el ID del producto)
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => setProductos(json.data ?? []))
      .catch((err) => console.error('Error cargando productos', err));
  };

  // Función para cargar datos en el formulario al dar click en "Editar"
  const handleEditarClick = (producto) => {
    setEditandoId(producto.id);
    setSku(producto.sku);
    setNombre(producto.nombre);
    setError('');
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setSku('');
    setNombre('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validar que SKU sea obligatorio
    if (!sku.trim()) {
      setError('⚠️ El campo SKU es obligatorio.');
      return;
    }

    const datos = { sku, nombre };
    
    try {
      let resp;
      if (editandoId) {
        // MODO EDICIÓN: Usamos PUT
        resp = await fetch(`${API_URL}/${editandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });
      } else {
        // Usamos POST
        resp = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });
      }

      if (resp.ok) {
        // Si todo sale bien, recargamos la lista y limpiamos
        cargarProductos();
        handleCancelar();
      } else {
        // Mostrar mensaje si la API responde 400
        const errorData = await resp.json();
        setError(errorData.message || 'Error al guardar');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="app-container">
      <h1>Inventario (CI/CD) - {editandoId ? 'Editando' : 'Creando'}</h1>
      
      {error && (
        <div style={{ color: 'red', backgroundColor: '#ffd7d7', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>SKU: </label>
          <input 
            value={sku} 
            onChange={(e) => setSku(e.target.value)}
            placeholder="A-001"
          />
        </div>
        <div>
          <label>Nombre: </label>
          <input 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Cable HDMI"
          />
        </div>
        
        <div style={{ marginTop: '10px' }}>
            <button type="submit" style={{ marginRight: '10px', backgroundColor: editandoId ? 'orange' : '' }}>
                {editandoId ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
            
            {editandoId && (
                <button type="button" onClick={handleCancelar} style={{ backgroundColor: 'gray' }}>
                    Cancelar
                </button>
            )}
        </div>
      </form>

      <hr />
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((p) => (
          <li key={p.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '300px' }}>
            <span>{p.sku} - {p.nombre}</span>
            <button onClick={() => handleEditarClick(p)} style={{ fontSize: '12px', padding: '5px' }}>
                Editar ✏️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;