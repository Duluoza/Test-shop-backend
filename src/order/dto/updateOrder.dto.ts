import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { arrayValidate } from "../enums/orderStatus";

export class UpdateOrderDto {
    @ApiProperty({
        description: 'orderId',
        required: true,
        format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    orderId: string;

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