import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class FindOneOrderDto {
    @ApiProperty({
        description: 'orderId',
        required: true,
        format: 'number',
    })
    @IsNotEmpty()
    @IsNumber()
    orderId: number
}