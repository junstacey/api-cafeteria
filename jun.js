import express from 'express';

const app = express();

app.use(express.json());

// Array de pedidos inicial

let pedidos = [
    { Id: 0, cliente: "Jun", item: ["croissant", "latte"], total: 5500 },
    { Id: 1, cliente: "Sofi", item: ["Medialuna", "americano"], total: 4200 },
    { Id: 2, cliente: "Mari", item: ["Matcha"], total: 3500 },
    { Id: 3, cliente: "Ali", item: ["croissant", "espresso"], total: 4000 },
    { Id: 4, cliente: "Marcos", item: ["croissant", "latte"], total: 5500 },
    { Id: 5, cliente: "Juan", item: ["croissant", "Dona", "smoothie de mango"], total: 7500 },
    { Id: 6, cliente: "Carla", item: ["croissant", "latte"], total: 5500 },
]

// leer todos los pedidos
app.get('/pedidos', (req, res) => {
    res.json(pedidos);
});

//leer un pedido por Id
app.get('/pedidos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pedido = pedidos.find(p => p.Id === id);
    if (!pedido) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    };
    res.json(pedido);
  });

//crear un nuevo pedido
app.post('/pedidos', (req, res)  => {
        const{cliente, item, total} = req.body ;

if (!cliente || !item || !total) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  };

      const nuevoPedido = {
        Id: pedidos.lenght > 0 ? pedidos[pedidos.lenght - 1].Id + 1 : 0,
        cliente,
        item,
        total,
        estado: "pendiente" // estado inicial del pedido
     };

    // Agregar el nuevo pedido al array de pedidos
    pedidos.push(nuevoPedido);
    res.status(201).json({ mensaje: "Pedido creado", pedido: nuevoPedido });
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
    const pediddoIndex = pedidos.findIndex(p => p.Id === id);
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


