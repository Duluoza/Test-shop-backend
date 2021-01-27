import { billCreator, DATE_NOW } from "../utils/billCreator";
import { PublicAllOrdersDto } from "../../order/dto/publicAllOrders.dto";

describe('bill creator', () => {

    test('should be definded', () => {
        expect(billCreator).toBeDefined()
        expect(billCreator).not.toBeUndefined()
    })

    test('should return new Bill', async () => {
        const order: PublicAllOrdersDto = {
            id: 1,
            status: "Done",
            productId: 1,
            createdAt: new Date("2021-01-24T11:18:09.418Z"),
            updatedAt: new Date("2021-01-25T10:06:23.396Z"),
            product: {
                id: 1,
                name: "TV",
                price: 100,
                currency: "USD",
                createdAt: "2020-11-11T13:01:35.752Z",
                updatedAt: "2021-01-24T11:18:01.909Z",
                discounts: [
                    {
                        id: 1,
                        discount: 20,
                        type: "monthly",
                        createdAt: "2021-01-24T11:18:01.891Z",
                        updatedAt: "2021-01-24T11:18:01.891Z",
                    }
                ]
            }
        }
        const result = {
            "name": "TV",
            "price": 100,
            "currency": "USD",
            "isDiscount": true,
            "priceWithDiscount": 80,
            "order_created_at": new Date("2021-01-24T11:18:09.418Z"),
            "bill_created_at": DATE_NOW
        }
        expect(await billCreator(order)).toEqual(result)
    })

    test('should return new Bill without discount', async () => {
        const order: PublicAllOrdersDto = {
            id: 1,
            status: "Done",
            productId: 1,
            createdAt: new Date("2021-01-24T11:18:09.418Z"),
            updatedAt: new Date("2021-01-25T10:06:23.396Z"),
            product: {
                id: 1,
                name: "TV",
                price: 100,
                currency: "USD",
                createdAt: "2020-11-11T13:01:35.752Z",
                updatedAt: "2021-01-24T11:18:01.909Z",
                discounts: []
            }
        }
        const result = {
            "name": "TV",
            "price": 100,
            "currency": "USD",
            "isDiscount": false,
            "priceWithDiscount": 100,
            "order_created_at": new Date("2021-01-24T11:18:09.418Z"),
            "bill_created_at": DATE_NOW
        }
        expect(await billCreator(order)).toEqual(result)
    })
});