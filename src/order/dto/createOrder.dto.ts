import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({
        description: 'productId',
        required: true,
        format: 'number',
    })
    @IsNotEmpty()
    @IsNumber()
    productId: number
}