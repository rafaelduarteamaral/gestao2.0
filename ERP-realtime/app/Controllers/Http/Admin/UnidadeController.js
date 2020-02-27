'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Unidade = use('App/Models/Unidade')
const Transformer = use('App/Transformers/Admin/UnidadeTransformer')

class UnidadeController {
  /**
   * Show a list of all unidade.
   * GET unidade
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform }) {
    const nome = request.input('nome')
    const query = Unidade.query()
    if (nome) {
      query.where('nome', 'LIKE', `%${nome}%`)
    }
    var unidade = await query.paginate(pagination.page, pagination.limit)
    unidade = await transform.paginate(unidade, Transformer)
    return response.send(unidade)
  }

  /**
   * Create/save a new unidade.
   * POST unidade
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform }) {
    try {
      const { nome, abreviatura} = request.all()
      var unidade = await Unidade.create({
        nome,
        abreviatura
      })
      unidade = await transform.item(unidade, Transformer)
      return response.status(201).send(unidade)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível cria unidade neste momento!' })
    }
  }

  /**
   * Display a single unidade.
   * GET unidade/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var unidade = await Unidade.findOrFail(id)
    unidade = await transform.item(unidade, Transformer)
    return response.send(unidade)
  }

  /**
   * Update unidade details.
   * PUT or PATCH unidade/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var unidade = await Unidade.findOrFail(id)
    try {
      const { nome, abreviatura } = request.all()
      unidade.merge({ nome, abreviatura })
      await unidade.save()
      unidade = await transform.item(unidade, Transformer)
      return response.send(unidade)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar a unidade' })
    }
  }

  /**
   * Delete a unidade with id.
   * DELETE unidade/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const unidade = await Unidade.findOrFail(id)
    try {
      await unidade.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar a unidade!' })
    }
  }
}

module.exports = UnidadeController
