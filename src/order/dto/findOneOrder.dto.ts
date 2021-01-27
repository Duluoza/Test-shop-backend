import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class FindOneOrderDto {
    @ApiProperty({
        description: 'orderId',
        required: true,
        format: 'number',
    })
    @IsNotEmpty()
    @IsString()
    orderId: string
}