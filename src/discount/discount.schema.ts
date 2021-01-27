import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { PublicProductDto } from '../products/dto/publicProducts.dto';
import { ProductModel } from '../products/products.schema';
import { ProductToDiscountDependencyModel } from '../productToDiscountDependency/productToDiscountDependency.schema';

@Table
export class DiscountModel extends Model {

    @Column
    discount: number; // in percentages

    @Column
    type: string;
    
    @BelongsToMany(() => ProductModel, () => ProductToDiscountDependencyModel)
    products: PublicProductDto;
}