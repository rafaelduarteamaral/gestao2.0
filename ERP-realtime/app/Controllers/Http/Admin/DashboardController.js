'use strict'

const DB = use('Database')
class DashboardController {

  async index({ response }) {
    const users = await DB.from('users').getCount()
    const orders = await DB.from('orders').getCount()
    const products = await DB.from('products').getCount()
    //const subtotal = await DB.from('order_items').getSum('subtotal')
    //const discounts = await DB.from('coupon_order').getSum('discount')

    const subtotal = await DB.select('order_items.subtotal').from('order_items')
          .leftJoin('orders', 'order_items.order_id', 'orders.id')
          .where('orders.status', '=', 'paid')
          .andWhere('orders.type', '=', 'sell')
          .orWhere('orders.status', '=', 'finished')
          .getSum('subtotal')

    const compras = await DB.select('order_items.subtotal').from('order_items')
      .leftJoin('orders', 'order_items.order_id', 'orders.id')
      .where('orders.status', '=', 'paid')
      .andWhere('orders.type', '=', 'buy')
      .orWhere('orders.status', '=', 'finished')
      .getSum('subtotal')

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
