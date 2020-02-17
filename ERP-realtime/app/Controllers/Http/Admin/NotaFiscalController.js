'use strict'

const DB = use('Database')
class NotaFiscalController {
  async store({ request, response, transform }) {
    const nota = request.all()
    const infoNota = await DB.select('*').from('order_items')
    .leftJoin('products', 'order_items.product_id', 'products.id')
    .leftJoin('orders', 'order_items.order_id', 'orders.id')
    .where('orders.status', '=', 'paid')
    .orWhere('orders.status', '=', 'finished')
    .orWhere('order_items.id', '=', nota.id)
    response.send(infoNota)
  }
}

module.exports = NotaFiscalController
