import { TypeDiscounts } from "./enums/typeDiscounts";

const initialData = [
    {
      discount: 20,
      type: TypeDiscounts.MONTHLY
    },
  ];
  
  export async function rootDiscountCreate(discountModel) {
    try {
      const discountList = await discountModel.findAll({});
      if (!discountList.length) {
        await discountModel.bulkCreate(initialData);
      } 
    } catch (error) {
      console.log('discount seeds', error)
    }
  }