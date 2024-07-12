import express, { Request, Response } from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';

export const productRouter = express.Router();

productRouter.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());

  try {
    const productDto = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };

    const output = await useCase.execute(productDto);

    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRouter.get('/', async (req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository());
  try {
    const output = await useCase.execute({});

    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
