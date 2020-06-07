import express from 'express';
import knex from './database/connection';

import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';

const routes = express.Router();

const itemsController = new ItemsController();
const pointsController = new PointsController();

// Rota: endereço completo da requisição
// Recurso: qual entidade estamos acessando do sistema

// Requisições HTTP
// GET: buscar uma ou mais informações do backend
// POST: criar uma nova informação no backend
// PUT: atualizar uma informação existente no backend
// DELETE: deletar uma informação do backend

// Params
// Request params: params que vem na própria rota que identificam um recurso
// Query params: params que vem na própria, geralmente opcionais
// Request Body: params para criação e atualização de informações

routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.post('/points', pointsController.create);
routes.get('/points/:id', pointsController.show);

export default routes;
