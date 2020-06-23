import { Request, Response } from 'express';
import { config } from 'dotenv';
import knex from '../database/connection';

config();

class ItemsController {
  async index (request: Request, response: Response) {
    const items = await knex('items').select('*');

    const serielizedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `${process.env.SERVER_URL}/uploads/${item.image}`,
      };
    });

    response.json({ items: serielizedItems });
  }
}

export default ItemsController;
