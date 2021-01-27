import { Injectable, Logger } from '@nestjs/common';
import config from '../../config'
const moment = require('moment');
import * as _ from 'lodash';
import { PublicProductDto } from 'src/products/dto/publicProducts.dto';

/** CompareDates service */
@Injectable()
export class CompareDates {
  private readonly logger = new Logger(CompareDates.name);

  async compareProductsAndDiscountDates(products: PublicProductDto[]): Promise<PublicProductDto[]> {
    
    const dateNow = new Date(Date.now()) 

    const productsNeedDiscount = products.filter(product => {
        const diff = moment(dateNow).diff(product.createdAt, 'day');
        if(diff > config.the_number_of_days_after_which_the_discount_is_set){
            this.logger.log('Found a product for which to set a discount')
            return product
        }
    })

    return productsNeedDiscount
  }
}
