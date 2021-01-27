import { BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { DiscountModel } from '../discount/discount.schema';
import { PublicDiscountDto } from '../discount/dto/publicDiscount';
import { OrderModel } from '../order/order.schema';
import { ProductToDiscountDependencyModel } from '../productToDiscountDependency/productToDiscountDependency.schema';

@Table
export class ProductModel extends Model {

    @BelongsToMany(() => DiscountModel, () => ProductToDiscountDependencyModel)
    discounts: PublicDiscountDto

    @Column
    name: string;

    @Column
    price: number;

    @Column
    currency: string;

    @HasMany(() => OrderModel)
    order: []
}

