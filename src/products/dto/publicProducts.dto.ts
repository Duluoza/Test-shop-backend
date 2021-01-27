import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { PublicDiscountDto } from "../../discount/dto/publicDiscount";

export class PublicProductDto {
    @ApiProperty({
        description: 'id',
        required: true,
        format: 'postgres id',
    })
    id: number;

    @ApiProperty({
        description: 'name',
        required: true,
        format: 'string',
    })
    name: string;

    @ApiProperty({
        description: 'price',
        required: true,
        format: 'number',
    })
    price: number;

    @ApiProperty({
        description: 'currency',
        required: true,
        format: 'string',
    })
    currency: string;

    @ApiProperty({
        description: 'discounts',
        required: true,
        format: 'PublicDiscountDto[]',
    })
    discounts: PublicDiscountDto[]

    @ApiProperty({
        description: 'createdAt',
        required: true,
        format: 'Date',
    })
    createdAt?: string;

    @ApiProperty({
        description: 'updatedAt',
        required: true,
        format: 'Date',
    })
    updatedAt?: string;
}