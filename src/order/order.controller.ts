import { Body, Controller, Get, Logger, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { RolesGuard } from '../auth/role.strategy';
import { CreateOrderDto } from './dto/createOrder.dto';
import { FindOneOrderDto } from './dto/findOneOrder.dto';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderModel } from './order.schema';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { PublicOrderDto } from './dto/publicOrder.dto';
import { QueryFindAllDto } from './dto/queryFindAll.dto';
import { PublicAllOrdersDto } from './dto/publicAllOrders.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
    /** logger */
  private readonly logger = new Logger(OrderController.name);
  /**
   * OrderController
   * @param {OrderService} orderService - order service inject
   * @param {OrderRepository} orderRepository - order repository inject
   */
  constructor(
    private readonly orderService: OrderService,
    private readonly orderRepository: OrderRepository,
  ) {
  }

  /**
   * /createOrder endpoint handler
   */
  @RolesGuard(['cashier'])
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: OrderModel })
  @Post('/create')
  async createOrder(
    @Body() data: CreateOrderDto,
  ): Promise<OrderModel> {
    this.logger.log(`create order for product ${data.productId}`);
    return this.orderService.createOrder(data);
  }

  /**
   * /findOneOrder endpoint handler
   */
  @RolesGuard(['seller'])
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: PublicOrderDto })
  @Get('/findOne')
  async findOneOrder(
    @Query() data: FindOneOrderDto,
  ): Promise<OrderModel> {
    this.logger.log(`find one order ${data.orderId}`);
    return this.orderService.findOneOrder(data);
  }

  /**
   * /findOrderList endpoint handler
   */
  @RolesGuard(['accountant'])
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: PublicAllOrdersDto })
  @Get('/findAll')
  async findOrderList(
    @Query() data: QueryFindAllDto
  ): Promise<OrderModel[]> {
    this.logger.log(`find order list`);
    return this.orderRepository.findOrderList(data);
  }

  /**
   * /updateOrder endpoint handler
   */
  @RolesGuard(['seller'])
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: PublicOrderDto })
  @Patch('/update')
  async updateOrder(
    @Body() data: UpdateOrderDto,
  ): Promise<OrderModel> {
    this.logger.log(`update order`);
    return this.orderService.updateOrder(data);
  }
}
