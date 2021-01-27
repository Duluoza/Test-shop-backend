import { PublicDiscountDto } from '../../discount/dto/publicDiscount';

export const calculateDiscountedPrice = async (price: number, discounts: PublicDiscountDto[]): Promise<number> => {

    const discountSum = discounts.reduce((acc: number, currentValue: PublicDiscountDto): number => {
        return acc + currentValue.discount
    }, 0)

    const total: number = +(price - ( (price/100 ) * discountSum)).toFixed(2)

    return total
}