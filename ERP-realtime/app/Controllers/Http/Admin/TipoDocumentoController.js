'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const TipoDocumento = use('App/Models/TipoDocumento')
const Transformer =  use('App/Transformers/Admin/TipoDocumentoTransformer')

class TipoDocumentoController {
 /**
   * Show a list of all fabricante.
   * GET fabricante
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

   async index({request, response, pagination, transform, auth}) {
       const nome = request.input('nome')
       const query = TipoDocumento.query()
       const me = await auth.getUser()

       query.where('empresa_id', '=', me.empresa_id)
        if (nome) {
            query.where('nome', 'LIKE', `%${nome}`)
        }

        var tipoDocumento = await query.paginate(pagination.page, pagination.limit)
        tipoDocumento = await transform.paginate(tipoDocumento, Transformer)
        return response.send(tipoDocumento)
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
      const { nome, sigla, plano_de_contas } = request.all()
      var tipoDocumento = await TipoDocumento.create({
        nome,
        sigla, 
        plano_de_contas,
        empresa_id: me.empresa_id
      })
      tipoDocumento = await transform.item(tipoDocumento, Transformer)
      return response.status(201).send(tipoDocumento)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível criar o fabricante neste momento!' })
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
    var tipoDocumento = await TipoDocumento.findOrFail(id)
    tipoDocumento = await transform.item(tipoDocumento, Transformer)
    return response.send(tipoDocumento)
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
    var tipoDocumento = await TipoDocumento.findOrFail(id)
    try {
      const { nome, sigla, plano_de_contas } = request.all()
      tipoDocumento.merge({ nome, sigla, plano_de_contas })
      await tipoDocumento.save()
      tipoDocumento = await transform.item(tipoDocumento, Transformer)
      return response.send(tipoDocumento)
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
    const tipoDocumento = await TipoDocumento.findOrFail(id)
    try {
      await tipoDocumento.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar o fabricante' })
    }
  }
}


module.exports = TipoDocumentoController
