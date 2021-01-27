import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductToDiscountDependencyModel } from './productToDiscountDependency.schema';

/** ProductToDiscountDependency Repository for db operations */
@Injectable()
export class ProductToDiscountDependencyRepository {
  /**
   * ProductToDiscountDependencyRepository
   * @param {ProductToDiscountDependencyModel} productToDiscountDependencyModel- productToDiscountDependency model inject
   * 
   */
  constructor(
    @InjectModel(ProductToDiscountDependencyModel) private productToDiscountDepsModel: typeof ProductToDiscountDependencyModel,
  ) {

  }

  async create(data: any): Promise<void> {
    this.productToDiscountDepsModel.bulkCreate(data);
  }

}