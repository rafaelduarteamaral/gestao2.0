'use strict'
const Ncm = use('App/Models/Ncm')
const Transformer = use('App/Transformers/Admin/NcmTransformer')

class NcmController {
    /**
   * Show a list of all ncm.
   * GET ncm
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
    const nome = request.input('nome')
    const query = Ncm.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)
    if (nome) {
      query.where('nome', 'LIKE', `%${nome}%`)
    }
    var ncm = await query.paginate(pagination.page, pagination.limit)
    ncm = await transform.paginate(ncm, Transformer)
    return response.send(ncm)
  }

  /**
   * Create/save a new ncm.
   * POST ncm
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try {
      const me = await auth.getUser()
      const { nome, codigonbm, cest, aliquota, codigoex } = request.all()
      var ncm = await Ncm.create({
        nome,
        codigonbm,
        codigoex,
        aliquota,
        cest,
        empresa_id: me.empresa_id
      })
      ncm = await transform.item(ncm, Transformer)
      return response.status(201).send(ncm)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível cria o ncm neste momento!' })
    }
  }

  /**
   * Display a single ncm.
   * GET ncm/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var ncm = await Ncm.findOrFail(id)
    ncm = await transform.item(ncm, Transformer)
    return response.send(ncm)
  }

  /**
   * Update ncm details.
   * PUT or PATCH ncm/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var ncm = await Ncm.findOrFail(id)
    try {
      const { nome, codigonbm, codigoex, cest, aliquota} = request.all()
      ncm.merge({ nome, codigonbm, codigoex, cest, aliquota})
      await ncm.save()
      ncm = await transform.item(ncm, Transformer)
      return response.send(ncm)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar a ncm' })
    }
  }

  /**
   * Delete a ncm with id.
   * DELETE ncm/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const ncm = await Ncm.findOrFail(id)
    try {
      await ncm.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar o ncm' })
    }
  }
}

module.exports = NcmController
