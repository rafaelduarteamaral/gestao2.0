'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const SeguimentoNegocio = use('App/Models/SeguimentoNegocio')
const Transformer = use('App/Transformers/Admin/SeguimentoNegocioTransformer')

class SeguimentoNegocioController {
     /**
   * Show a list of all seguimentoNegocio.
   * GET seguimentoNegocio
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
    const nome = request.input('nome')
    const query = SeguimentoNegocio.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)
    if (nome) {
      query.where('nome', 'LIKE', `%${nome}%`)
    }
    var seguimentoNegocio = await query.paginate(pagination.page, pagination.limit)
    seguimentoNegocio = await transform.paginate(seguimentoNegocio, Transformer)
    return response.send(seguimentoNegocio)
  }

  /**
   * Create/save a new seguimentoNegocio.
   * POST seguimentoNegocio
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try {
      const { nome } = request.all()
      const me = await auth.getUser()
      var seguimentoNegocio = await SeguimentoNegocio.create({
        nome,
        empresa_id: me.empresa_id
      })
      seguimentoNegocio = await transform.item(seguimentoNegocio, Transformer)
      return response.status(201).send(seguimentoNegocio)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível cria seguimento de negocio neste momento!' })
    }
  }

  /**
   * Display a single seguimentoNegocio.
   * GET seguimentoNegocio/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var seguimentoNegocio = await SeguimentoNegocio.findOrFail(id)
    seguimentoNegocio = await transform.item(seguimentoNegocio, Transformer)
    return response.send(seguimentoNegocio)
  }

  /**
   * Update seguimentoNegocio details.
   * PUT or PATCH seguimentoNegocio/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var seguimentoNegocio = await SeguimentoNegocio.findOrFail(id)
    try {
      const { nome } = request.all()
      seguimentoNegocio.merge({ nome })
      await seguimentoNegocio.save()
      seguimentoNegocio = await transform.item(seguimentoNegocio, Transformer)
      return response.send(seguimentoNegocio)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar o seguimento de negocio' })
    }
  }

  /**
   * Delete a seguimentoNegocio with id.
   * DELETE seguimentoNegocio/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const seguimentoNegocio = await SeguimentoNegocio.findOrFail(id)
    try {
      await seguimentoNegocio.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar o seguimento de negocio' })
    }
  }
}

module.exports = SeguimentoNegocioController
