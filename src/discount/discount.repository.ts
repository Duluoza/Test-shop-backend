import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DiscountModel } from './discount.schema';


/** Discount Repository for db operations */
@Injectable()
export class DiscountRepository {
  /**
   * DiscountRepository
   * @param {DiscountModel} discountModel - discount model inject
   * 
   */
  constructor(
    @InjectModel(DiscountModel) private discountModel: typeof DiscountModel,
  ) {

  }

  async findOne(discountId: number): Promise<DiscountModel> {
    return this.discountModel.findOne({
        where: {
          id: discountId,
        },
        raw: true
      });
  }

}