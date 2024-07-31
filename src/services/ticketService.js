import TicketDao from '../daos/mongodb/ticketDao.js'
import * as cartServices from './cartServices.js'
import * as productService from './productServices.js'
import { v4 as uuidv4 } from 'uuid';
const ticketDao = new TicketDao()
export const generateTicket = async (user) =>{
try {
const cart = await cartServices.getById(user.cart)
if(!cart)return null
let entireAmount = 0

for (const element of cart.products) {
  const product = await productService.getById(element.product);
  if (!product) continue; 
  let currentEntire = element.quantity * product.price;
  entireAmount += currentEntire;
  if(element.quantity<=product.stock) {
    await productService.updateStock(element.product, element.quantity) 
  }else return 
}
  const ticket = await ticketDao.create({
    code: uuidv4(),
    purchase_datetime: new Date().toLocaleString(),
    amount: entireAmount,
    purchaser: user.email,
  })
  //await cartServices.clearCart(user.cart)
  return ticket
} catch (error) {
  throw new Error(error)
}
  return 
}
