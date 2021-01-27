import { PublicProductDto } from "src/products/dto/publicProducts.dto";
import { CompareDates } from "./compare.service";

describe('Compare Dates', () => {
    let compareDates: CompareDates;

    beforeEach(() => {
        compareDates = new CompareDates();
      });

    test('should be definded', () => {
        expect(compareDates).toBeDefined()
        expect(compareDates).not.toBeUndefined()
    })

    test('should return products which needs discount', async () => {
        const products: PublicProductDto[] = [
            {
                id: 1,
                name: "TV",
                price: 100,
                currency: "USD",
                createdAt: "2020-11-11T13:01:35.752Z",
                updatedAt: "2021-01-24T11:18:01.909Z",
                discounts: []
            }
        ]
           
        
        expect(await compareDates.compareProductsAndDiscountDates(products)).toEqual(products)
    })
});