import { Currency } from "./enums/currency";
import { ProductsName } from "./enums/productsName";

const initialData = [
  {
    name: ProductsName.TV,
    price: 100,
    currency: Currency.USD,
    createdAt: '2020-11-11T13:01:35.752Z',
  },
  {
    name: ProductsName.PHONE,
    price: 50,
    currency: Currency.USD,
  },
  {
    name: ProductsName.WATCH,
    price: 10,
    currency: Currency.USD,
  },
];

export async function rootProductsCreate(productsModel) {
  try {
    const productsList = await productsModel.findAll({});
    if (!productsList.length) {
      await productsModel.bulkCreate(initialData);
    }
    return true
  } catch (error) {
    console.log('products seeds', error)
    return false
  }
}
