import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";

export class QueryFindAllDto {
    @ApiProperty({
        description: 'from',
        required: false,
        format: 'year-month-day or year-month-dayThour:minutes'
    })
    @IsOptional()
    @IsDateString()
    from?: Date;

    @ApiProperty({
        description: 'to',
        required: false,
        format: 'year-month-day or year-month-dayThour:minutes'
    })
    @IsOptional()
    @IsDateString()
    to?: Date;
}