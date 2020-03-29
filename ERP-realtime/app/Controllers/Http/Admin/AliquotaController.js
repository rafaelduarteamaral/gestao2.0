'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Aliquota = use('App/Models/Aliquota')
const Transformer = use('App/Transformers/Admin/AliquotaTransformer')


class AliquotaController {
  /**
   * Show a list of all aliquota.
   * GET aliquota
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
    const nome = request.input('nome')
    const query = Aliquota.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)
    if (nome) {
      query.where('nome', 'LIKE', `%${nome}%`)
    }
    var aliquota = await query.paginate(pagination.page, pagination.limit)
    aliquota = await transform.paginate(aliquota, Transformer)
    return response.send(aliquota)
  }

  /**
   * Create/save a new aliquota.
   * POST aliquota
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try {
      const me = await auth.getUser()
      const { nome, codigo, descricao } = request.all()
      var aliquota = await Aliquota.create({
        nome,
        codigo,
        descricao,
        empresa_id: me.empresa_id
      })
      aliquota = await transform.item(aliquota, Transformer)
      return response.status(201).send(aliquota)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível cria o aliquota neste momento!' })
    }
  }

  /**
   * Display a single aliquota.
   * GET aliquota/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var aliquota = await Aliquota.findOrFail(id)
    aliquota = await transform.item(aliquota, Transformer)
    return response.send(aliquota)
  }

  /**
   * Update aliquota details.
   * PUT or PATCH aliquota/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var aliquota = await Aliquota.findOrFail(id)
    try {
      const { nome, codigo, descricao } = request.all()
      aliquota.merge({ nome, codigo, descricao })
      await aliquota.save()
      aliquota = await transform.item(aliquota, Transformer)
      return response.send(aliquota)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar a aliquota' })
    }
  }

  /**
   * Delete a aliquota with id.
   * DELETE aliquota/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const aliquota = await Aliquota.findOrFail(id)
    try {
      await aliquota.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar o aliquota' })
    }
  }
}

module.exports = AliquotaController
