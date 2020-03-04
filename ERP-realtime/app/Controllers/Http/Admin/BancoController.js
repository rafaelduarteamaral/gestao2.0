'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Bancos = use('App/Models/Banco')
const Transformer = use('App/Transformers/Admin/BancoTransformer')

class BancoController {
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
    const nome = request.input('agencia')
    const query = Bancos.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)

    if (nome) {
      query.where('agencia', 'LIKE', `%${nome}%`)
    }
    var banco = await query.paginate(pagination.page, pagination.limit)
    banco = await transform.paginate(banco, Transformer)
    return response.send(banco)
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
    try {
      const me = await auth.getUser()
      const {     
        nome,
        banco,   
        agencia,
        conta,
        convenio,
        carteira,
        variacaocarteira,
        nossonumero,
        formatoremessa,
        protesto 
      } = request.all()

      var cadastro_banco = await Bancos.create({
        nome,
        banco,   
        agencia,
        conta,
        convenio,
        carteira,
        variacaocarteira,
        nossonumero,
        formatoremessa,
        protesto,
        empresa_id: me.empresa_id
      })

      cadastro_banco = await transform.item(cadastro_banco, Transformer)
      return response.status(201).send(cadastro_banco)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível cria forma de pagamento neste momento!' })
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
    var banco = await Bancos.findOrFail(id)
    banco = await transform.item(banco, Transformer)
    return response.send(banco)
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
    var cadastro_banco = await Bancos.findOrFail(id)
    try {
      const {  
        nome,
        banco,          
        agencia,
        conta,
        convenio,
        carteira,
        variacaocarteira,
        nossonumero,
        formatoremessa,
        protesto 
      } = request.all()

      cadastro_banco.merge({ 
        nome,
        banco,   
        agencia,
        conta,
        convenio,
        carteira,
        variacaocarteira,
        nossonumero,
        formatoremessa,
        protesto 
      })

      await cadastro_banco.save()
      cadastro_banco = await transform.item(cadastro_banco, Transformer)
      return response.send(cadastro_banco)

    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar a forma de pagamento!' })
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
    const banco = await Bancos.findOrFail(id)
    try {
        await banco.delete()
        return response.status(204).send()
    } catch (error) {
        return response
          .status(500)
          .send({ message: 'Não foi possível deletar a forma de pagamento!' })
    }
  }
}

module.exports = BancoController
