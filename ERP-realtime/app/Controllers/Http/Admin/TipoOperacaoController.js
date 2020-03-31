'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const TipoOperacao = use('App/Models/TipoOperacao')
const Transformer = use('App/Transformers/Admin/TipoOperacaoTransformer')

class TipoOperacaoController {
      /**
   * Show a list of all tipoOperacao.
   * GET tipoOperacao
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
    const nome = request.input('nome')
    const query = TipoOperacao.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)
    if (nome) {
      query.where('nome', 'LIKE', `%${nome}%`)
    }
    var tipoOperacao = await query.paginate(pagination.page, pagination.limit)
    tipoOperacao = await transform.paginate(tipoOperacao, Transformer)
    return response.send(tipoOperacao)
  }

  /**
   * Create/save a new tipoOperacao.
   * POST tipoOperacao
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try {
      const me = await auth.getUser()
      const { 
        codigo,
        tipo,
        icms,
        nome,
        cod_enquadramento_ipi,
        descricao,
        csosn,
        st_pis_cofins,
        base_calculo_icms,
        aliquota_pis,
        aliquota_cofins,
        aliquota_issqn,
        } = request.all()
      var tipoOperacao = await TipoOperacao.create({
        codigo,
        tipo,
        icms,
        nome,
        cod_enquadramento_ipi,
        descricao,
        csosn,
        st_pis_cofins,
        base_calculo_icms,
        aliquota_pis,
        aliquota_cofins,
        aliquota_issqn,
        empresa_id: me.empresa_id
      })
      tipoOperacao = await transform.item(tipoOperacao, Transformer)
      return response.status(201).send(tipoOperacao)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível cria o tipoOperacao neste momento!' })
    }
  }

  /**
   * Display a single tipoOperacao.
   * GET tipoOperacao/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var tipoOperacao = await TipoOperacao.findOrFail(id)
    tipoOperacao = await transform.item(tipoOperacao, Transformer)
    return response.send(tipoOperacao)
  }

  /**
   * Update tipoOperacao details.
   * PUT or PATCH tipoOperacao/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var tipoOperacao = await TipoOperacao.findOrFail(id)
    try {
      const {
        codigo,
        tipo,
        icms,
        nome,
        cod_enquadramento_ipi,
        descricao,
        csosn,
        st_pis_cofins,
        base_calculo_icms,
        aliquota_pis,
        aliquota_cofins,
        aliquota_issqn,
      } = request.all()
      tipoOperacao.merge({
        codigo,
        tipo,
        icms,
        nome,
        cod_enquadramento_ipi,
        descricao,
        csosn,
        st_pis_cofins,
        base_calculo_icms,
        aliquota_pis,
        aliquota_cofins,
        aliquota_issqn,
      })
      await tipoOperacao.save()
      tipoOperacao = await transform.item(tipoOperacao, Transformer)
      return response.send(tipoOperacao)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar a tipoOperacao' })
    }
  }

  /**
   * Delete a tipoOperacao with id.
   * DELETE tipoOperacao/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const tipoOperacao = await TipoOperacao.findOrFail(id)
    try {
      await tipoOperacao.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar o tipoOperacao' })
    }
  }
}

module.exports = TipoOperacaoController
