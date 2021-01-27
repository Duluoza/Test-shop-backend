import { PublicAllOrdersDto } from "src/order/dto/publicAllOrders.dto";
import { PublicBillDto } from "../dto/publicBill.dto";
import { calculateDiscountedPrice } from "./calculateDiscountedPrice";

export const DATE_NOW = new Date(Date.now());

export const billCreator = async (order: PublicAllOrdersDto): Promise<PublicBillDto> => {
   const { product } = order;

   let isDiscount: boolean = false
   let priceWithDiscount: number = product.price;

   if (product.discounts.length !== 0) {
    isDiscount = true
    priceWithDiscount = await calculateDiscountedPrice(product.price, product.discounts)
   }

   const bill = {
       name: product.name,
       price: product.price,
       currency: product.currency,
       isDiscount: isDiscount,
       priceWithDiscount: priceWithDiscount,
       order_created_at: order.createdAt,
       bill_created_at: DATE_NOW
   }

   return bill;
}
