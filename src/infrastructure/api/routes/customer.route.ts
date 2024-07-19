import express, { Request, Response } from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import CustomerPresenter from '../presenter/customer.presenter';

export const customerRouter = express.Router();

customerRouter.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        city: req.body.address.city,
        street: req.body.address.street,
        number: req.body.address.number,
        zipCode: req.body.address.zipCode,
      },
    };

    const output = await useCase.execute(customerDto);

    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRouter.get('/', async (req: Request, res: Response) => {
  const useCase = new ListCustomerUseCase(new CustomerRepository());
  const output = await useCase.execute({});

  res.format({
    json: () => res.send(output),
    xml: () => res.send(CustomerPresenter.listXML(output)),
  });
});
