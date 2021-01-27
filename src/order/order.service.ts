import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { ProductsRepository } from '../products/products.repository';
import { OrderRepository } from './order.repository';
import { FindOneOrderDto } from './dto/findOneOrder.dto';
import { OrderModel } from '../order/order.schema';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrderService {
    /**
     * OrderService
     * @param {orderRepository} OrderRepository - inject
     * @param {productsRepository} ProductsRepository - inject
     */
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productsRepository: ProductsRepository,
    ) { }

    async createOrder(data: CreateOrderDto): Promise<OrderModel> {
        const { productId } = data

        const checkProduct = await this.productsRepository.findOneById(productId)

        if(!checkProduct) {
            throw new HttpException("Product not Found", HttpStatus.NOT_FOUND);
        }

        return this.orderRepository.createOrder(data)
    }

    async findOneOrder(data: FindOneOrderDto): Promise<OrderModel> {
        const { orderId } = data

        const checkOrder = await this.orderRepository.findOneOrder(orderId)

        if(checkOrder) {
            return checkOrder
        }
        
        throw new HttpException("Order not Found", HttpStatus.NOT_FOUND);
    }

    async updateOrder(data: UpdateOrderDto): Promise<OrderModel> {
        const checkOrder = await this.orderRepository.findOneOrder(data.orderId)

        if(!checkOrder) {
            throw new HttpException("Order not Found", HttpStatus.NOT_FOUND);
        }

        if (checkOrder.status === data.status) {
            throw new HttpException(`The order already has this status: ${data.status}`, HttpStatus.BAD_REQUEST);
        }

        return this.orderRepository.updateOrder(data)
    }
}
