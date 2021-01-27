import { Column, Default, IsIn, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { arrayValidate, OrderStatus } from './enums/orderStatus';
import { ProductModel } from '../products/products.schema';
import { PublicProductDto } from '../products/dto/publicProducts.dto';

@Table
export class OrderModel extends Model {

    @Default(OrderStatus.PENDING)
    @IsIn([arrayValidate])
    @Column
    status: string;

    @ForeignKey(() => ProductModel)
    @Column
    productId: number;

    @BelongsTo(() => ProductModel)
    product: PublicProductDto

}

