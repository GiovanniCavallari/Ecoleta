import express from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';

import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';

const routes = express.Router();
const upload = multer(multerConfig);

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
routes.get('/points/:id', pointsController.show);

routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    })
  }, {
    abortEarly: false,
  }),
  pointsController.create);

export default routes;
