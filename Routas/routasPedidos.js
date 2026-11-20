import {Router} from 'express';
import {
    getPedidos,
    getPedidosPendientes,
    getPedidosCompletados,
    getPedidosId,
    createPedidos,
    updateEstadoPedidosId,
    updatePedidosId,
    deletePedidosId
} from '../controllers/pedidosControllers.js'

const router = Router ();

router.get('/', getPedidos);
router.get('/pendientes', getPedidosPendientes);
router.get('/completados', getPedidosCompletados);
router.get('/:id',getPedidosId);
router.post('/', createPedidos);
router.patch('/:id', updateEstadoPedidosId);
router.put('/:id', updatePedidosId );
router.delete('/:id',deletePedidosId);

export default router;

