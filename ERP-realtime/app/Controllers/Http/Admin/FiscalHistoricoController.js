'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Historico = use('App/Models/FiscalHistorico')
const Transformer = use('App/Transformers/Admin/FiscalHistoricoTransformer')

class FiscalHistoricoController {
    /**
   * Show a list of all historico.
   * GET historico
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
    const texto = request.input('texto')
    const query = Historico.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)
    if (texto) {
      query.where('texto', 'LIKE', `%${texto}%`)
    }
    var historico = await query.paginate(pagination.page, pagination.limit)
    historico = await transform.paginate(historico, Transformer)
    return response.send(historico)
  }

  /**
   * Create/save a new historico.
   * POST historico
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try {
      const me = await auth.getUser()
      const { texto, ativo} = request.all()
      var historico = await Historico.create({
        texto,
        ativo,
        empresa_id: me.empresa_id
      })
      historico = await transform.item(historico, Transformer)
      return response.status(201).send(historico)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível cria o historico neste momento!' })
    }
  }

  /**
   * Display a single historico.
   * GET historico/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var historico = await Historico.findOrFail(id)
    historico = await transform.item(historico, Transformer)
    return response.send(historico)
  }

  /**
   * Update historico details.
   * PUT or PATCH historico/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var historico = await Historico.findOrFail(id)
    try {
      const { texto, ativo } = request.all()
      historico.merge({ texto, ativo })
      await historico.save()
      historico = await transform.item(historico, Transformer)
      return response.send(historico)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar a historico' })
    }
  }

  /**
   * Delete a historico with id.
   * DELETE historico/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const historico = await Historico.findOrFail(id)
    try {
      await historico.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar o historico' })
    }
  }
}

module.exports = FiscalHistoricoController
