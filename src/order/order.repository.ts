import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from './order.schema';
import { CreateOrderDto } from './dto/createOrder.dto';
import { ProductModel } from '../products/products.schema';
import { DiscountModel } from '../discount/discount.schema';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { QueryFindAllDto } from './dto/queryFindAll.dto';
import { Op } from 'sequelize';
import { PublicAllOrdersDto } from './dto/publicAllOrders.dto';

/** Order Repository for db operations */
@Injectable()
export class OrderRepository {
  /**
   * OrderRepository
   * @param {OrderModel} orderModel - order model inject
   * 
   */
  constructor(
    @InjectModel(OrderModel) private orderModel: typeof OrderModel,
  ) {

  }

  async createOrder(data: CreateOrderDto): Promise<OrderModel> {
    const result = await this.orderModel.create({
        productId: data.productId
    })

    return result
  }

  async findOrderList(data: QueryFindAllDto): Promise<OrderModel[]> {

    const from = new Date(data.from)
    const to = new Date(data.to)

    let options = {}

    if (data.from && data.to) {
      options = {
        createdAt: {
          [Op.gte]: from,
          [Op.lte]: to,
        }        
      }
    }

    const result = await this.orderModel.findAll({
      where: options,
      include: [
        {
          model: ProductModel,
          include: [
            {
                model: DiscountModel,
            },
          ],
        }
      ],
    })
    return result
  }

  async findOneOrder(id: number): Promise<OrderModel> {
    return this.orderModel.findOne({
      where: {
        id: id
      },
      raw: true,
    })
  }

  async updateOrder(data: UpdateOrderDto): Promise<OrderModel> {
    const result = await this.orderModel.update(
      { status: data.status }, 
      { 
        where: { id: data.orderId },
        returning: true,
      }
    )
    return result[1][0]
  }

  async findOneOrderWithAllIncludes(id: number): Promise<PublicAllOrdersDto>{
    const result = await this.orderModel.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: ProductModel,
          include: [
            {
                model: DiscountModel,
            },
          ],
        }
      ],
    })

    return JSON.parse(JSON.stringify(result))
  }

}