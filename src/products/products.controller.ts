import { Controller, Get, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';
import { ApiResponse } from '@nestjs/swagger/dist/decorators';
import { RolesGuard } from '../auth/role.strategy';
import { PublicProductDto } from './dto/publicProducts.dto';
import { ProductsRepository } from './products.repository';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  /** logger */
  private readonly logger = new Logger(ProductsController.name);
  /**
   * ProductsController
   * @param {ProductRepository} productRepository - product repository inject
   */
  constructor(
    private readonly productsRepository: ProductsRepository,
  ) {
  }

  /**
   * /findAll endpoint handler
   */
  @RolesGuard(['seller', 'cashier', 'accountant'])
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: [PublicProductDto] })
  @Get('/findAll')
  async findAllTrips(
  ): Promise<PublicProductDto[]> {
    this.logger.log(`findAll`);
    return this.productsRepository.findAllWithDiscount();
  }
}
