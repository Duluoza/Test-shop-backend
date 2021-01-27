import { Module, OnModuleInit } from '@nestjs/common';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize';
import { DiscountModel } from './discount.schema';
import { rootDiscountCreate } from './seed';
import { DiscountRepository } from './discount.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([DiscountModel]),
  ],
  providers: [DiscountRepository],
  exports: [DiscountRepository]
})
export class DiscountModule implements OnModuleInit {
  constructor(
    @InjectModel(DiscountModel) private discountModel: typeof DiscountModel,
  ) { }

  async onModuleInit() {
    await rootDiscountCreate(this.discountModel);
  }
}
