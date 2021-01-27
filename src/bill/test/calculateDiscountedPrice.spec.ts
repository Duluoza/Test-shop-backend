import { calculateDiscountedPrice } from "../utils/calculateDiscountedPrice";

describe('Calculate Discounted Price', () => {

    test('should be definded', () => {
        expect(calculateDiscountedPrice).toBeDefined()
        expect(calculateDiscountedPrice).not.toBeUndefined()
    })

    test('should return calculated value', async () => {
        const discounts = 
        [
            {
                id: 1,
                discount: 20,
                type: "monthly",
                createdAt: "2021-01-24T11:18:01.891Z",
                updatedAt: "2021-01-24T11:18:01.891Z",
            },
            {
                id: 2,
                discount: 30,
                type: "monthly",
                createdAt: "2021-01-24T11:18:01.891Z",
                updatedAt: "2021-01-24T11:18:01.891Z",
            }
        ]
        const price = 100;

        const result = 50;

        expect(await calculateDiscountedPrice(price, discounts)).toEqual(result)
    })
});