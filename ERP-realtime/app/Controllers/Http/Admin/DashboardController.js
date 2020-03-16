'use strict'

const DB = use('Database')
class DashboardController {

  async index({ response }) {
    const users = await DB.from('users').getCount()
    const orders = await DB.from('orders').getCount()
    const products = await DB.from('products').getCount()
    //const subtotal = await DB.from('order_items').getSum('subtotal')
    //const discounts = await DB.from('coupon_order').getSum('discount')

    const subtotal = await DB.select('total').from('orders')
          .where('status', '=', 'paid')
          .andWhere('type', '=', 'sell')
          .getSum('total')

    const compras = await DB.select('total').from('orders')
      .where('status', '=', 'paid')
      .andWhere('type', '=', 'buy')
      .orWhere('status', '=', 'finished')
      .getSum('total')

    let total = subtotal + (compras * -1)

    const discounts = await DB.select('coupon_order.discount').from('coupon_order')
          .leftJoin('orders', 'coupon_order.order_id', 'orders.id')
          .where('orders.status', '=', 'paid')
          .orWhere('orders.status', '=', 'finished')
          .getSum('discount')


    const revenues = total - discounts
    return response.send({ users, revenues, orders, products })
  }
}

module.exports = DashboardController
