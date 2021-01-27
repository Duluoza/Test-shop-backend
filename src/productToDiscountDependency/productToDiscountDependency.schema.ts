import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DiscountModel } from '../discount/discount.schema';
import { ProductModel } from '../products/products.schema';

@Table
export class ProductToDiscountDependencyModel extends Model {
    @ForeignKey(() => ProductModel)
    @Column
    productId: number;

    @ForeignKey(() => DiscountModel)
    @Column
    discountId: number;
}