import { ApiProperty } from "@nestjs/swagger";

export class PublicBillDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    price: number;

    @ApiProperty()
    currency: string;

    @ApiProperty()
    isDiscount: boolean;

    @ApiProperty()
    priceWithDiscount: number;

    @ApiProperty()
    order_created_at: Date;

    @ApiProperty()
    bill_created_at: Date;
}