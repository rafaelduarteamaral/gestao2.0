'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const MovimentoBancario = use('App/Models/MovimentoBancario')
const Transformer = use('App/Transformers/Admin/MovimentoBancarioTransformer')


class MovimentoBancarioController {

/**
   * Show a list of all banco.
   * GET banco
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
        const nome = request.input('nome')
        const query =  MovimentoBancario.query()
        const me = await auth.getUser()
        query.where('empresa_id', '=', me.empresa_id)
          if (nome){
            query.where('nome', 'LIKE', `%${nome}%`)
          }
          var movimentoBancario = await query.paginate(pagination.page, pagination.limit)
          movimentoBancario = await transform.paginate(movimentoBancario, Transformer)
          return response.send(movimentoBancario)
  }


  /**
   * Create/save a new banco.
   * POST banco
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try{
      const { banco_debito, banco_credito, valor, data_lancamento, descricao} = request.all()
      const me = await auth.getUser()
        var movimentoBancario = await MovimentoBancario.create({
          banco_debito,
          banco_credito,
          valor,
          data_lancamento,
          descricao,
          empresa_id: me.empresa_id
        })
        movimentoBancario = await transform.item(movimentoBancario, Transformer)
        return response.status(201).send(movimentoBancario)
    }catch (error){
      response 
      .status(400)
      .send({message: 'Não foi possivel criar o Movimento Bancário.'})
    }
  }

  /**
   * Display a single banco.
   * GET banco/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var movimentoBancario =  await MovimentoBancario.findOrFail(id)
      movimentoBancario = await transform.item(movimentoBancario, Transformer)
    return response.send(movimentoBancario)
  }


  /**
   * Update banco details.
   * PUT or PATCH banco/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var movimentoBancario = await MovimentoBancario.findOrFail(id)
    try{
      const {banco_debito, banco_credito, valor, data_lancamento, descricao} = request.all()
        movimentoBancario.merge({banco_debito, banco_credito, valor, data_lancamento, descricao})
      await movimentoBancario.save()
        movimentoBancario =  await transform.item(movimentoBancario, Transformer)
      return response.send(movimentoBancario)
    } catch (error){
      return response
      .status(400)
      .send({message: 'Não foi possível atualizar o Movimento Bancário '})
    }
  }

  /**
   * Delete a banco with id.
   * DELETE banco/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const movimentoBancario =  await MovimentoBancario.findOrFail(id)
    try {
      await movimentoBancario.delete()
      return response.status(204).send()
    }catch (error) {
      return response
        .status(500)
        .send({message: 'Não foi possivel deletar o Movimento Bancário'})
    }
  }
}

module.exports = MovimentoBancarioController
