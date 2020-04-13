'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const CondicaoPagamento = use('App/Models/CondicaoPagamento')
const Transformer = use('App/transformers/Admin/CondicaoPagamentoTransformer')

class CondicaoPagamentoController {

    /**
   * Show a list of all formaPgto.
   * GET formaPgto
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
    const nome = request.input('nome')
    const query = CondicaoPagamento.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)
    if (nome) {
      query.where('nome', 'LIKE', `%${nome}%`)
    }
    var condicaoPagamento = await query.paginate(pagination.page, pagination.limit)
    condicaoPagamento = await transform.paginate(condicaoPagamento, Transformer)
    return response.send(condicaoPagamento)
  }

  /**
   * Create/save a new formaPagamento.
   * POST formaPgto
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try {
      const { nome, desconto, parcelas, dias, intervalo, vencimento, forma_pagamento} = request.all()
      const me = await auth.getUser()
      var condicaoPagamento = await CondicaoPagamento.create({
        nome,
        desconto,
        parcelas,
        dias,
        intervalo, 
        vencimento, 
        forma_pagamento,
        empresa_id: me.empresa_id
      })
      condicaoPagamento = await transform.item(condicaoPagamento, Transformer)
      return response.status(201).send(condicaoPagamento)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível criar condição de pagamento neste momento!' })
    }
  }
        /**
         * Display a single formaPagamento.
         * GET formaPgto/:id
         *
         * @param {object} ctx
         * @param {Request} ctx.request
         * @param {Response} ctx.response
         * @param {View} ctx.view
         */
    async show({ params: { id }, response, transform }) {
        var condicaoPagamento = await CondicaoPagamento.findOrFail(id)
        condicaoPagamento = await transform.item(condicaoPagamento, Transformer)
        return response.send(condicaoPagamento)
    }

        /**
     * Update formaPagamento details.
     * PUT or PATCH formaPgto/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params: { id }, request, response, transform }) {
        var condicaoPagamento = await CondicaoPagamento.findOrFail(id)
        try {
            const { nome, desconto, parcelas, dias, intervalo, vencimento, forma_pagamento } = request.all()
            condicaoPagamento.merge({ nome, desconto, parcelas, dias, intervalo, vencimento, forma_pagamento })
            await condicaoPagamento.save()
            condicaoPagamento = await transform.item(condicaoPagamento, Transformer)
            return response.send(condicaoPagamento)
          } catch (error) {
            return response
                .status(400)
                .send({ message: 'Não foi possível atualizar a condição de pagamento' })
        }
    }

            /**
         * Delete a formaPagamento with id.
         * DELETE formaPgto/:id
         *
         * @param {object} ctx
         * @param {Request} ctx.request
         * @param {Response} ctx.response
         */
        async destroy({ params: { id }, request, response }) {
            const condicaoPagamento = await CondicaoPagamento.findOrFail(id)
            try {
            await condicaoPagamento.delete()
            return response.status(204).send()
            } catch (error) {
            return response
                .status(500)
                .send({ message: 'Não foi possível deletar a condição de pagamento!' })
            }
        }
}

module.exports = CondicaoPagamentoController
