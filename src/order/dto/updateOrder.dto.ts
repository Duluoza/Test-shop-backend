import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { arrayValidate } from "../enums/orderStatus";

export class UpdateOrderDto {
    @ApiProperty({
        description: 'orderId',
        required: true,
        format: 'number',
    })
    @IsNotEmpty()
    @IsNumber()
    orderId: number;

    @ApiProperty({
        description: 'status',
        required: true,
        format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(arrayValidate)
    status: string;
}