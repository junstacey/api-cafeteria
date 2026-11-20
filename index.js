import express from 'express';
import { getPedidosId } from './controllers/pedidosControllers';

const app = express();

app.use(express.json());


// Rutas de la API
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API: pedidos de café');
})

// leer todos los pedidos
app.get('/pedidos', (req, res) => {
    res.json(pedidos);
});

//leer un pedido por Id

  // Leer pedidos pendientes
  app.get('/pedidos/pendientes', (req, res) => {
    const pedidosPendientes = pedidos.filter(P => P.estado === "pendiente");
    res.json(pedidosPendientes);
  })

  // Leer pedidos completados
  app.get('/pedidos/completados', (req, res) => {
    const pedidosCompletados = pedidos.filter(P => P.estado === "completado");
    res.json(pedidosCompletados);
  });

//crear un nuevo pedido
app.post('/pedidos', (req, res)  => {
        const{cliente, item, total} = req.body ;

if (!cliente || !item || !total) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  };

      const nuevoPedido = {
        Id: pedidos.length > 0 ? pedidos[pedidos.length - 1].Id + 1 : 1,
        cliente,
        item,
        total,
        estado: "pendiente" // estado inicial del pedido
     };

    // Agregar el nuevo pedido al array de pedidos
    pedidos.push(nuevoPedido);
    res.status(201).json({ mensaje: "Pedido creado", pedido: nuevoPedido });
});
    
// Actualizar el estado de un pedido por Id
app.patch('/pedidos/:id/estado', (req, res) => {
    const id = parseInt(req.params.id);
    const pedidoIndex = pedidos.findIndex(p => p.Id === id);
    if (pedidoIndex === -1) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    }
    const { estado } = req.body;
    pedidos[pedidoIndex] = { ...pedidos[pedidoIndex], estado };
    res.status(200).json({ mensaje: "Estado del pedido actualizado", pedido: pedidos[pedidoIndex] });
});

// actualizar un pedido por Id
app.put('/pedidos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pedidoIndex = pedidos.findIndex(p => p.Id === id);
    if (pedidoIndex === -1) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    }
    const { cliente, item, total } = req.body;
    pedidos[pedidoIndex] = { ...pedidos[pedidoIndex], cliente, item, total };
    res.status(200).json({ mensaje: "Pedido actualizado", pedido: pedidos[pedidoIndex] });
});
// Eliminar un pedido por Id
app.delete('/pedidos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pedidoIndex = pedidos.findIndex(p => p.Id === id);
    if (pedidoIndex === -1) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    }
    pedidos.splice(pedidoIndex, 1);
    res.status(200).json({ mensaje: "Pedido eliminado" });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});