import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderRepository } from '../order/order.repository';
import { GenerateBillDto } from './dto/generateBill.dto';
import { PublicBillDto } from './dto/publicBill.dto';
import { billCreator } from './utils/billCreator';

@Injectable()
export class BillService {
    /**
     * BillService
     * @param {orderRepository} OrderRepository - inject
     */
    constructor(
        private readonly orderRepository: OrderRepository,
    ) { }

    async generateBill(data: GenerateBillDto): Promise<PublicBillDto> {
        const { orderId } = data

        const order = await this.orderRepository.findOneOrderWithAllIncludes(orderId)

        if(!order) {
            throw new HttpException("Order not Found", HttpStatus.NOT_FOUND);
        }

        if(order.status !== 'Done'){
            throw new HttpException("Order status not equals Done", HttpStatus.BAD_REQUEST);
        }

        const bill = await billCreator(order);

        return bill;
    }
}
