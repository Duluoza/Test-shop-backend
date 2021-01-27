import { ApiProperty } from "@nestjs/swagger";

export class PublicOrderDto {
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
}