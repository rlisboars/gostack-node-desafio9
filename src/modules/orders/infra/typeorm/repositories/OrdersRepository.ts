import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import AppError from '@shared/errors/AppError';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });
    await this.ormRepository.save(order);
    return order;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne(id);
    if (!order) throw new AppError(`Order ${id} not found`);
    return order;
  }
}

export default OrdersRepository;
