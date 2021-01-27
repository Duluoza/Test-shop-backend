import { Test, TestingModule } from "@nestjs/testing";
import { ProductToDiscountDependencyRepository } from "../productToDiscountDependency/productToDiscountDependency.repository";
import { QueueSender } from "../bull/queue.sender";
import { PublicProductDto } from "../products/dto/publicProducts.dto";
import { ProductsRepository } from "./products.repository";
import { ProductsService } from "./products.service";
import { DiscountRepository } from "../discount/discount.repository";
import { CompareDates } from "../utils/CompareDates/compare.service";

describe('Products Service', () => {
    let productsService: ProductsService;

    beforeEach(async () => {
        class Mock {}

        const services = [
            QueueSender,
            ProductsRepository,
            ProductToDiscountDependencyRepository,
            DiscountRepository,
            CompareDates
        ]

        const servicesWithMock = services.map(serv => ({provide: serv, useClass: Mock}))

        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                ...servicesWithMock
            ]
        }).compile();

        productsService = moduleRef.get<ProductsService>(ProductsService);
    });

    test('should return products list without discount', async () => {
        const products: PublicProductDto[] = [
            {
                id: 1,
                name: "TV",
                price: 100,
                currency: "USD",
                createdAt: "2020-11-11T13:01:35.752Z",
                updatedAt: "2021-01-24T11:18:01.909Z",
                discounts: []
            },
            {
                id: 2,
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
                    },
                ]
            }
        ]

        const result: PublicProductDto[] = [
            {
                id: 1,
                name: "TV",
                price: 100,
                currency: "USD",
                createdAt: "2020-11-11T13:01:35.752Z",
                updatedAt: "2021-01-24T11:18:01.909Z",
                discounts: []
            },
        ]
           
        expect(await productsService.filterProductsList(products)).toEqual(result)
    })
});