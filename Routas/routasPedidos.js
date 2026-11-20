import express from 'express';
import {
    getPedidos,
    getPedidosPendientes,
    getPedidosCompletados,
    getPedidosId,
    createPedidos,
    nuevoPedido,
    updateEstadoPedidosId,
    updatePedidosId,
    deletePedidosId
} from '../controllers/pedidosControllers.js'

const router = router ();

router.get('/', getPedidos);
router.get('/pendientes', getPedidosPendientes);
router.get('/completados', getPedidosCompletados);
router.get('/id',getPedidosById);
router.post('/', createPedidos);
router.pach('/id', updateEstadoPedidosId);
router.put('/id', updatePedidosId );
router.delete('/id',deletePedidosId);

export default router;

