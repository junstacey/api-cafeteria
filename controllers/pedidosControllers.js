// Array de pedidos inicial 
import pedidos from '../myModules/arrayPedidos.js'

// Recibir todos los pedidos 

export const getPedidos = ( req, res) => { 
    res.json(pedidos);
};


// Recibir los pedidos pendientes

export const getPedidosPendientes = ( req, res) => {
    const pedidosPendientes = pedidos.filter(P => P.estado === "pendiente");
    res.json(pedidosPendientes);
}

//Recibir los pedidos terminados 

export const getPedidosCompletados = ( req, res) => {
    const pedidosCompletados = pedidos.filter(P => P.estado === "completado");
    res.json(pedidosCompletados);

}

//Recupar un pedido por su ID

export const getPedidosId = (req, res) => {
    const id = parseInt(req.params.id);
    const pedido = pedidos.find(p => p.Id === id);
    if (!pedido) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    };
    res.json(pedido);

};

// crear un nuevo pedido

export const createPedidos = (req, res) =>{
     const{cliente, item} = req.body ;

if (!cliente || !item ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  };

      const nuevoPedido = {
        Id: pedidos.length > 0 ? pedidos[pedidos.length - 1].Id + 1 : 1,
        cliente,
        item,
        estado: "pendiente" // estado inicial del pedido
     };
  // Agregar el nuevo pedido al array de pedidos
    pedidos.push(nuevoPedido);
    res.status(201).json({ mensaje: "Pedido creado", pedido: nuevoPedido });
};

// Modificar el estado de un pedido por ID
export const updateEstadoPedidosId = (req, res) => {
const id = parseInt(req.params.id);
    const pedidoIndex = pedidos.findIndex(p => p.Id === id);
    if (pedidoIndex === -1) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    }
    const { estado } = req.body;
    pedidos[pedidoIndex] = { ...pedidos[pedidoIndex], estado };
    res.status(200).json({ mensaje: "Estado del pedido actualizado", pedido: pedidos[pedidoIndex] });

}

// Actualizar un pedido por Id
export const updatePedidosId = (req, res) => {
const id = parseInt(req.params.id);
    const pedidoIndex = pedidos.findIndex(p => p.Id === id);
    if (pedidoIndex === -1) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    }
    const { cliente, item } = req.body;
    pedidos[pedidoIndex] = { ...pedidos[pedidoIndex], cliente, item };
    res.status(200).json({ mensaje: "Pedido actualizado", pedido: pedidos[pedidoIndex] });

}

// Eliminar un pedido por Id
export const deletePedidosId = (req, res) => {
    const id = parseInt(req.params.id);
    const pedidoIndex = pedidos.findIndex(p => p.Id === id);
    if (pedidoIndex === -1) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    }
    pedidos.splice(pedidoIndex, 1);
    res.status(200).json({ mensaje: "Pedido eliminado" });
};

