import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductToDiscountDependencyRepository } from './productToDiscountDependency.repository';
import { ProductToDiscountDependencyModel } from './productToDiscountDependency.schema';

@Module({
    imports: [
      SequelizeModule.forFeature([ProductToDiscountDependencyModel]),
    ],
    providers: [ProductToDiscountDependencyRepository,],
    exports: [ProductToDiscountDependencyRepository]
})
export class ProductToDiscountDependencyModule {}
