'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const FormaPagamento = use('App/Models/FormaPagamento')
const Transformer = use('App/Transformers/Admin/FormaPagamentoTransformer')

class FormaPagamentoController {
    /**
   * Show a list of all formaPgto.
   * GET formaPgto
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
    const nome = request.input('nome')
    const query = FormaPagamento.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)
    if (nome) {
      query.where('nome', 'LIKE', `%${nome}%`)
    }
    var formaPgto = await query.paginate(pagination.page, pagination.limit)
    formaPgto = await transform.paginate(formaPgto, Transformer)
    return response.send(formaPgto)
  }

  /**
   * Create/save a new formaPagamento.
   * POST formaPgto
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try {
      const { nome, codigo, liquidez} = request.all()
      const me = await auth.getUser()
      var formaPagamento = await FormaPagamento.create({
        nome,
        codigo,
        liquidez,
        empresa_id: me.empresa_id
      })
      formaPagamento = await transform.item(formaPagamento, Transformer)
      return response.status(201).send(formaPagamento)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível cria forma de pagamento neste momento!' })
    }
  }

  /**
   * Display a single formaPagamento.
   * GET formaPgto/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var formaPagamento = await FormaPagamento.findOrFail(id)
    formaPagamento = await transform.item(formaPagamento, Transformer)
    return response.send(formaPagamento)
  }

  /**
   * Update formaPagamento details.
   * PUT or PATCH formaPgto/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var formaPagamento = await FormaPagamento.findOrFail(id)
    try {
      const { nome, codigo, liquidez } = request.all()
      formaPagamento.merge({ nome, codigo, liquidez })
      await formaPagamento.save()
      formaPagamento = await transform.item(formaPagamento, Transformer)
      return response.send(formaPagamento)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar a forma de pagamento!' })
    }
  }

  /**
   * Delete a formaPagamento with id.
   * DELETE formaPgto/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const formaPagamento = await FormaPagamento.findOrFail(id)
    try {
      await formaPagamento.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar a forma de pagamento!' })
    }
  }
}

module.exports = FormaPagamentoController
