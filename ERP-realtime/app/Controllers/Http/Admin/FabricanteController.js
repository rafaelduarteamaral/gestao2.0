'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Fabricante = use('App/Models/Fabricante')
const Transformer = use('App/Transformers/Admin/FabricanteTransformer')

class FabricanteController {
       /**
   * Show a list of all fabricante.
   * GET fabricante
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
    const nome = request.input('nome')
    const query = Fabricante.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)
    if (nome) {
      query.where('nome', 'LIKE', `%${nome}%`)
    }
    var fabricante = await query.paginate(pagination.page, pagination.limit)
    fabricante = await transform.paginate(fabricante, Transformer)
    return response.send(fabricante)
  }

  /**
   * Create/save a new fabricante.
   * POST fabricante
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try {
      const me = await auth.getUser()
      const { nome } = request.all()
      var fabricante = await Fabricante.create({
        nome,
        empresa_id: me.empresa_id
      })
      fabricante = await transform.item(fabricante, Transformer)
      return response.status(201).send(fabricante)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível cria o fabricante neste momento!' })
    }
  }

  /**
   * Display a single fabricante.
   * GET fabricante/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var fabricante = await Fabricante.findOrFail(id)
    fabricante = await transform.item(fabricante, Transformer)
    return response.send(fabricante)
  }

  /**
   * Update fabricante details.
   * PUT or PATCH fabricante/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var fabricante = await Fabricante.findOrFail(id)
    try {
      const { nome } = request.all()
      fabricante.merge({ nome })
      await fabricante.save()
      fabricante = await transform.item(fabricante, Transformer)
      return response.send(fabricante)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar o fabricante' })
    }
  }

  /**
   * Delete a fabricante with id.
   * DELETE fabricante/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const fabricante = await Fabricante.findOrFail(id)
    try {
      await fabricante.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar o fabricante' })
    }
  }
}

module.exports = FabricanteController
