'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const CstOrigem = use('App/Models/CstOrigem')
const Transformer = use('App/Transformers/Admin/CstOrigemTransformer')

class CstOrigemController {
    /**
   * Show a list of all cstOrigem.
   * GET cstOrigem
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
    const nome = request.input('nome')
    const query = CstOrigem.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)
    if (nome) {
      query.where('nome', 'LIKE', `%${nome}%`)
    }
    var cstOrigem = await query.paginate(pagination.page, pagination.limit)
    cstOrigem = await transform.paginate(cstOrigem, Transformer)
    return response.send(cstOrigem)
  }

  /**
   * Create/save a new cstOrigem.
   * POST cstOrigem
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try {
      const me = await auth.getUser()
      const { nome, codigo, descricao } = request.all()
      var cstOrigem = await CstOrigem.create({
        nome,
        codigo,
        descricao,
        empresa_id: me.empresa_id
      })
      cstOrigem = await transform.item(cstOrigem, Transformer)
      return response.status(201).send(cstOrigem)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível cria o cstOrigem neste momento!' })
    }
  }

  /**
   * Display a single cstOrigem.
   * GET cstOrigem/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var cstOrigem = await CstOrigem.findOrFail(id)
    cstOrigem = await transform.item(cstOrigem, Transformer)
    return response.send(cstOrigem)
  }

  /**
   * Update cstOrigem details.
   * PUT or PATCH cstOrigem/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var cstOrigem = await CstOrigem.findOrFail(id)
    try {
      const { nome, codigo, descricao } = request.all()
      cstOrigem.merge({ nome, codigo, descricao })
      await cstOrigem.save()
      cstOrigem = await transform.item(cstOrigem, Transformer)
      return response.send(cstOrigem)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar a cstOrigem' })
    }
  }

  /**
   * Delete a cstOrigem with id.
   * DELETE cstOrigem/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const cstOrigem = await CstOrigem.findOrFail(id)
    try {
      await cstOrigem.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar o cstOrigem' })
    }
  }
}

module.exports = CstOrigemController
