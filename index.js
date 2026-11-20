import express from 'express';
import rutasPedidos from './Routas/routasPedidos.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
 res.send('Bienvenido a mi API de pedidos');
})

app.use(express.json());

app.use('/pedidos', rutasPedidos);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http:${PORT}`);
});
