import { Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize/dist';
import { ProductModel } from './products.schema';
import { rootProductsCreate } from './seeds';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { BullQueueModule } from '../bull/bull.module';
import { CompareDates } from '../utils/CompareDates/compare.service';
import { ProductToDiscountDependencyModule } from '../productToDiscountDependency/productToDiscountDependency.module';
import { DiscountModule } from '../discount/discount.module';

@Module({
    imports: [
      SequelizeModule.forFeature([ProductModel]),
      BullQueueModule,
      ProductToDiscountDependencyModule,
      DiscountModule
    ],
    providers: [ProductsRepository, ProductsService, CompareDates],
    controllers: [ProductsController],
    exports: [ProductsRepository]
})
export class ProductsModule implements OnApplicationBootstrap {
    constructor(
      @InjectModel(ProductModel) private productModel: typeof ProductModel,
      private readonly productsService: ProductsService,
    ) { }
  
    async onApplicationBootstrap() {
      const productsCreated = await rootProductsCreate(this.productModel);
      if(productsCreated){
        this.productsService.checkProducts()
      }
    }
  }
