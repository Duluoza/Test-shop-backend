import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GenerateBillDto {
    @ApiProperty({
        description: 'orderId',
        required: true,
        format: 'number',
    })
    @IsNotEmpty()
    orderId: number
}