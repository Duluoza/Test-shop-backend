import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { ProductsModule } from './products/products.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuardClass } from './auth/role.strategy';
import { JwtModule } from '@nestjs/jwt';
import { DiscountModule } from './discount/discount.module';
import { CompareDates } from './utils/CompareDates/compare.service';
import { ProductToDiscountDependencyModule } from './productToDiscountDependency/productToDiscountDependency.module';
import { OrderModule } from './order/order.module';
import { BillModule } from './bill/bill.module';
import config from './config'


@Module({
  imports: [
    SequelizeModule.forRoot({
      ...config.sequelizeConfig
    }),
    ProductsModule,
    JwtModule.register({}),
    DiscountModule,
    ProductToDiscountDependencyModule,
    OrderModule,
    BillModule,
  ],
  controllers: [],
  providers: [
    CompareDates,
    {
      provide: APP_GUARD,
      useClass: RolesGuardClass,
    },
  ],
})
export class AppModule { }