'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Order = use('App/Models/Order')
const OrderItem = use('App/Models/OrderItem')
const Database = use('Database')
const Service = use('App/Services/Order/OrderService')
const Coupon = use('App/Models/Coupon')
const Discount = use('App/Models/Discount')
const Transformer = use('App/Transformers/Admin/OrderTransformer')
/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param { object } ctx.paginate
   */
  async index({ request, response, pagination, transform }) {
    const { status, id, type } = request.only(['status', 'id ', 'type'])
    const query = Order.query()
    if (status && id) {
      query.where('status', status).orWhere('id', 'LIKE', `%${id}%`)
    } else if (status) {
      query.where('status', status)
    } else if (id) {
      query.where('id', 'LIKE', `%${id}%`)
    } else if(type) {
      query.where('type', 'LIKE', type)
    }
    
    var orders = await query.paginate(pagination.page, pagination.limit)
    return response.send(orders)
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform }) {
    const trx = await Database.beginTransaction()
    try {
      const { user_id, type, items, status, numero_nfe, total } = request.all()
      var order = await Order.create({ user_id, type, status, numero_nfe, total }, trx)
      const service = new Service(order, trx)
      if (items && items.length > 0) {
        await service.syncItems(items)
      }
      await trx.commit()
      order = await Order.find(order.id)
      order = await transform.include('user,items').item(order, Transformer)
      return response.status(201).send(order)
    } catch (error) {
      await trx.rollback()
      return response.status(400).send({
        message: 'Não foi possivel criar o pedido no momento!'
      })
    }
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var order = await Order.findOrFail(id)
    order = await transform
      .include('items,user,discounts')
      .item(order, Transformer)
    return response.send(order)
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var order = await Order.findOrFail(id)
    const trx = await Database.beginTransaction()
    try {
      const { user_id, items, status, numero_nfe, total } = request.all()
      order.merge({ user_id, status, numero_nfe, total })
      const service = new Service(order, trx)
      await service.updateItems(items)
      await order.save(trx)
      await trx.commit()
      order = await transform
        .include('items,user,discounts,coupons')
        .item(order, Transformer)
      return response.send(order)
    } catch (error) {
      await trx.rollback()
      return response.status(400).send({
        message: 'Não foi possivel atualizar este pedido no momento!'
      })
    }
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const order = await Order.findOrFail(id)
    const orderItem = await OrderItem.findBy('order_id', id)
    try {
      await order.delete()
      await orderItem.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar este produto!' })
    }
  }

  async relatorioFinanceiro({ request, response, transform }){
    const orderItems = await Database.select('*').from('order_items')
    .leftJoin('orders', 'order_items.order_id', 'orders.id')
    .where('orders.status', '=', 'paid')
    .orWhere('orders.status', '=', 'finished')

    /* const discounts = await Database.select('coupon_order.discount').from('coupon_order')
        .leftJoin('orders', 'coupon_order.order_id', 'orders.id')
        .where('orders.status', '=', 'paid')
        .orWhere('orders.status', '=', 'finished') */

    return response.status(200).send(orderItems)

  }

  async applyDiscount({ params: { id }, request, response, transform }) {
    const { code } = request.all()
    const coupon = await Coupon.findByOrFail('code', code.toUpperCase())
    var order = await Order.findOrFail(id)

    try {
      var discount,
      info = {}

      const service = new Service(order)
      const canAddDiscount = await service.canApplyDiscount(coupon)
      const orderDiscounts = await order.coupons().getCount()
      const cannApplyToOrder =
        orderDiscounts < 1 || (orderDiscounts >= 1 && coupon.recursive)

      if (canAddDiscount && cannApplyToOrder) {
        discount = await Discount.findOrCreate({
          order_id: order.id,
          coupon_id: coupon.id
        })
        info.message = 'Cupom aplicado com sucesso!'
        info.success = true
      } else {
        info.message = 'Não foi possivel aplicar este cupom!'
        info.success = false
      }
      order = await transform
        .include('items,user,discounts,coupons')
        .item(order, Transformer)
      return response.send({ order, info })
    } catch (error) {
      return response.status(400).send({
        message: 'Erro ao selecionar o cupon!'
      })
    }


  }

  async removeDiscount({ request, response }) {
    const { discount_id } = request.all()
    const discount = await Discount.findOrFail(discount_id)
    await discount.delete()
    return response.status(204).send()
  }
}

module.exports = OrderController
