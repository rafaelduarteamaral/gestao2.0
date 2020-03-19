'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Cfop = use('App/Models/Cfop')
const Transformer = use('App/Transformers/Admin/CfopTransformer')

class CfopController {
  /**
   * Show a list of all cfop.
   * GET cfop
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
    const nome = request.input('nome')
    const query = Cfop.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)
    if (nome) {
      query.where('nome', 'LIKE', `%${nome}%`)
    }
    var cfop = await query.paginate(pagination.page, pagination.limit)
    cfop = await transform.paginate(cfop, Transformer)
    return response.send(cfop)
  }

  /**
   * Create/save a new cfop.
   * POST cfop
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try {
      const me = await auth.getUser()
      const { nome, codigo, descricao } = request.all()
      var cfop = await Cfop.create({
        nome,
        codigo,
        descricao,
        empresa_id: me.empresa_id
      })
      cfop = await transform.item(cfop, Transformer)
      return response.status(201).send(cfop)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível cria o cfop neste momento!' })
    }
  }

  /**
   * Display a single cfop.
   * GET cfop/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var cfop = await Cfop.findOrFail(id)
    cfop = await transform.item(cfop, Transformer)
    return response.send(cfop)
  }

  /**
   * Update cfop details.
   * PUT or PATCH cfop/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var cfop = await Cfop.findOrFail(id)
    try {
      const { nome, codigo, descricao } = request.all()
      cfop.merge({ nome, codigo, descricao })
      await cfop.save()
      cfop = await transform.item(cfop, Transformer)
      return response.send(cfop)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar a cfop' })
    }
  }

  /**
   * Delete a cfop with id.
   * DELETE cfop/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const cfop = await Cfop.findOrFail(id)
    try {
      await cfop.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar o cfop' })
    }
  }
}

module.exports = CfopController
