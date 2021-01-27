
import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class PublicDiscountDto {
    @ApiProperty({
        description: 'id',
        required: true,
        format: 'postgres id',
    })
    id: number;

    @ApiProperty({
        description: 'discount',
        required: true,
        format: 'number',
    })
    discount: number;

    @ApiProperty({
        description: 'type',
        required: true,
        format: 'string',
    })
    type: string;

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