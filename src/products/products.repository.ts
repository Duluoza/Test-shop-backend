import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from './products.schema';
import { DiscountModel } from '../discount/discount.schema';
import { PublicProductDto } from './dto/publicProducts.dto';

/** Products Repository for db operations */
@Injectable()
export class ProductsRepository {
  /**
   * ProductsRepository
   * @param {ProductModel} productModel - product model inject
   * 
   */
  constructor(
    @InjectModel(ProductModel) private productModel: typeof ProductModel,
  ) {

  }

  async findAllWithDiscount(): Promise<PublicProductDto[]> {
    const result = await this.productModel.findAll({
      include: [
        {
            model: DiscountModel,
        },
      ],
    })
    return JSON.parse(JSON.stringify(result))
  }

  async findOneById(id: number): Promise<ProductModel> {
    return this.productModel.findOne({
      where: {
        id: id
      },
      raw: true
    })
  }

}