import { ApiProperty } from "@nestjs/swagger";

class DiscountInclude {
    @ApiProperty()
    id: number;

    @ApiProperty()
    discount: number;

    @ApiProperty()
    type: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}

class ProductInclude {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    currency: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;

    @ApiProperty()
    discounts: DiscountInclude[]
}

export class PublicAllOrdersDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    status: string;

    @ApiProperty()
    productId: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    product: ProductInclude
}