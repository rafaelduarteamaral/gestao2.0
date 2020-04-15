'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const PlanejamentoFinanceiro = use('App/Models/PlanejamentoFinanceiro')
const Transformer = use('App/Transformers/Admin/PlanejamentoFinanceiroTransformer')

class PlanejamentoFinanceiroController {
    /**
   * Show a list of all PLanejamento Financeiro.
   * GET planejamento financeiro
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
    const nome = request.input('nome')
    const query =  PlanejamentoFinanceiro.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)
      if (nome){
        query.where('nome', 'LIKE', `%${nome}%`)
      }
      var planejamentoFinanceiro = await query.paginate(pagination.page, pagination.limit)
      planejamentoFinanceiro = await transform.paginate(planejamentoFinanceiro, Transformer)
      return response.send(planejamentoFinanceiro)
}

    /**
   * Create/save a new planejamento financeiro.
   * POST planejamento financeiro 
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try{
      const { conta_financeira, centro_custo, ano, data_inicial, data_final, bloq_movimento, valor} = request.all()
      const me = await auth.getUser()
        var planejamentoFinanceiro = await PlanejamentoFinanceiro.create({
          conta_financeira,
          centro_custo, 
          ano,
          data_inicial, 
          data_final, 
          bloq_movimento, 
          valor,
          empresa_id: me.empresa_id
        })
        planejamentoFinanceiro = await transform.item(planejamentoFinanceiro, Transformer)
        return response.status(201).send(planejamentoFinanceiro)
    }catch (error){
      response 
      .status(400)
      .send({message: 'Não foi possivel criar o Planejamento Financeiro.'})
    }
  }

    /**
   * Display a single planejamento financeiro.
   * GET planejamento financeiro/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var planejamentoFinanceiro =  await PlanejamentoFinanceiro.findOrFail(id)
    planejamentoFinanceiro = await transform.item(planejamentoFinanceiro, Transformer)
    return response.send(planejamentoFinanceiro)
  }

  /**
   * Update planejamento financeiro details.
   * PUT or PATCH planejamento financeiro/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var planejamentoFinanceiro = await PlanejamentoFinanceiro.findOrFail(id)
    try{
      const {conta_financeira, centro_custo, ano, data_inicial, data_final, bloq_movimento, valor} = request.all()
        planejamentoFinanceiro.merge({conta_financeira, centro_custo, ano, data_inicial, data_final, bloq_movimento, valor})
      await planejamentoFinanceiro.save()
        planejamentoFinanceiro =  await transform.item(planejamentoFinanceiro, Transformer)
      return response.send(planejamentoFinanceiro)
    } catch (error){
      return response
      .status(400)
      .send({message: 'Não foi possível atualizar o Planejamento Financeiro '})
    }
  }
/**
   * Delete a planejamento financeiro with id.
   * DELETE planejamento financeiro/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const planejamentoFinanceiro =  await PlanejamentoFinanceiro.findOrFail(id)
    try {
      await planejamentoFinanceiro.delete()
      return response.status(204).send()
    }catch (error) {
      return response
        .status(500)
        .send({message: 'Não foi possivel deletar o Planejamento Financeiro'})
    }
  }
}

module.exports = PlanejamentoFinanceiroController
