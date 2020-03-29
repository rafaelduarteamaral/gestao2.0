'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const CstTributacao = use('App/Models/CstTributacao')
const Transformer = use('App/Transformers/Admin/CstTributacaoTransformer')

class CstTributacaoController {
    /**
   * Show a list of all cstTributacao.
   * GET cstTributacao
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
    const nome = request.input('nome')
    const query = CstTributacao.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)
    if (nome) {
      query.where('nome', 'LIKE', `%${nome}%`)
    }
    var cstTributacao = await query.paginate(pagination.page, pagination.limit)
    cstTributacao = await transform.paginate(cstTributacao, Transformer)
    return response.send(cstTributacao)
  }

  /**
   * Create/save a new cstTributacao.
   * POST cstTributacao
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try {
      const me = await auth.getUser()
      const { nome, codigo, beneficio, descricao } = request.all()
      var cstTributacao = await CstTributacao.create({
        nome,
        codigo,
        descricao,
        beneficio,
        empresa_id: me.empresa_id
      })
      cstTributacao = await transform.item(cstTributacao, Transformer)
      return response.status(201).send(cstTributacao)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível cria o cstTributacao neste momento!' })
    }
  }

  /**
   * Display a single cstTributacao.
   * GET cstTributacao/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var cstTributacao = await CstTributacao.findOrFail(id)
    cstTributacao = await transform.item(cstTributacao, Transformer)
    return response.send(cstTributacao)
  }

  /**
   * Update cstTributacao details.
   * PUT or PATCH cstTributacao/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var cstTributacao = await CstTributacao.findOrFail(id)
    try {
      const { nome, codigo, beneficio, descricao } = request.all()
      cstTributacao.merge({ nome, codigo, beneficio, descricao })
      await cstTributacao.save()
      cstTributacao = await transform.item(cstTributacao, Transformer)
      return response.send(cstTributacao)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar a cstTributacao' })
    }
  }

  /**
   * Delete a cstTributacao with id.
   * DELETE cstTributacao/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const cstTributacao = await CstTributacao.findOrFail(id)
    try {
      await cstTributacao.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar o cstTributacao' })
    }
  }
}

module.exports = CstTributacaoController
