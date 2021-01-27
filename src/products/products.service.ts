import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CompareDates } from '../utils/CompareDates/compare.service';
import { ProductsRepository } from '../products/products.repository';
import config from '../config'
import { ProductToDiscountDependencyRepository } from '../productToDiscountDependency/productToDiscountDependency.repository';
import { DiscountRepository } from '../discount/discount.repository';
import { PublicProductDto } from './dto/publicProducts.dto';
import { QueueSender } from '../bull/queue.sender';

@Injectable()
export class ProductsService {
  /**
   * ProductsService
   * @param {QueueSender} queueSender - inject
   * @param {ProductsRepository} productsRepository - inject
   * @param {ProductToDiscountDependencyRepository} productToDiscountDepsRepository - inject
   * @param {DiscountRepository} discountRepository - inject
   * @param {CompareDates} compareDates - inject
   */
  constructor(
    private readonly queueSender: QueueSender,
    private readonly productsRepository: ProductsRepository,
    private readonly productToDiscountDepsRepository: ProductToDiscountDependencyRepository,
    private readonly discountRepository: DiscountRepository,
    private readonly compareDates: CompareDates,
  ) { }

    async checkProducts():Promise<void> {

      // remove all old Queue
      this.queueSender.cleanQueue()

      const productList = await this.productsRepository.findAllWithDiscount()
      const productsWithoutDiscounts = await this.filterProductsList(productList)

      const productsWithoutDiscount = await this.compareDates.compareProductsAndDiscountDates(productsWithoutDiscounts);
      
      this.createProductToDiscountDependency(productsWithoutDiscount, 1)

    }

    async createProductToDiscountDependency (productsWithoutDiscount, discountId: number) {

      if (productsWithoutDiscount && productsWithoutDiscount.length) {
        const discount = await this.discountRepository.findOne(discountId)

        if (!discount) {
          throw new HttpException("Discount not found", HttpStatus.NOT_FOUND);   
        }

        const newProductToDiscountDeps = productsWithoutDiscount.map(product => {
          return { productId: product.id, discountId: discount.id }
        })

        this.productToDiscountDepsRepository.create(newProductToDiscountDeps)
      }
      
      this.sendToBullQueue();
    }

    async sendToBullQueue() {
        this.queueSender.sendToServiceQueue(
            'ProductsService', 'checkProducts', {}, config.bull.checkProductsDelay,
        );
    }

    async filterProductsList(productsList: PublicProductDto[]): Promise<PublicProductDto[]> {
      return productsList.filter(product => product.discounts.length === 0)
    }
}
