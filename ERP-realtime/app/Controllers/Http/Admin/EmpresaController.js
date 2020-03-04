'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Empresa = use('App/Models/Empresa')
const Endereco = use('App/Models/EnderecoEmpresa')
const EmpresaTransformer = use('App/Transformers/Admin/EmpresaTransformer')
const EnderecoTransformer = use('App/Transformers/Admin/EnderecoTransformer')

const Database = use('Database')
/**
 * Resourceful controller for interacting with empresas
 */
class EmpresaController {
  /**
   * Show a list of all empresas.
   * GET empresas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform }) {
    const nome = request.input('nome')
    const query = Empresa.query()
    query.leftJoin('endereco_empresas', 'empresas.id', 'endereco_empresas.empresa_id')

    if (nome) {
      query.where('nome', 'LIKE', `%${nome}%`)
    }


    var empresa = await query.paginate(pagination.page, pagination.limit)
    empresa = await transform.paginate(empresa, EmpresaTransformer)
    
    return response.send(empresa)
  }


  /**
   * Create/save a new empresa.
   * POST empresas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, transform }) {

    const trx = await Database.beginTransaction()
    try {
      const empresaData = request.only([
        'nome',
        'razao_social',
        'cnpj',
        'cnae',
        'telefone1',
        'telefone2',
        'inscricaoestadual',
        'inscricaomunicipal'
      ])

      const enderecoData = request.only([
        'endereco'
      ])

      // Cadastrando empresa
      var empresa = await Empresa.create(empresaData, trx)
      empresa = await transform.item(empresa, EmpresaTransformer)
      // Cadastrando endereço
      var endereco = await Endereco.create({'empresa_id': empresa.id ,...enderecoData.endereco}, trx)
      endereco = await transform.item(endereco, EnderecoTransformer)

      // Preparando o retorno do empresa e endereco
      empresa.endereco = endereco
      trx.commit()
      return response.status(201).send({empresa})
    } catch (error) {
      trx.rollback()
      return response
        .status(400)
        .send(error)
    }
  }

  /**
   * Display a single empresa.
   * GET empresas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var empresa = await Database.select('*')
    .from('empresas')
    .leftJoin('endereco_empresas', 'empresas.id', 'endereco_empresas.empresa_id')
    .where('empresas.id', '=', id)
    .limit(1)

    empresa.forEach((obj) => {
      empresa = obj
    })

    empresa = {
      'id': id,
      'nome': empresa.nome,
      'razao_social': empresa.razao_social,
      'cnpj': empresa.cnpj,
      'cnae': empresa.cnae,
      'inscricaoestadual': empresa.inscricaoestadual,
      'inscricaomunicipal': empresa.inscricaomunicipal,
      'telefone1': empresa.telefone1,
      'telefone2': empresa.telefone2,
      'endereco': {
        'fuso_hr': empresa.fuso_hr ,
        'logradouro': empresa.logradouro,
        'cep': empresa.cep,
        'numero': empresa.numero,
        'cidade': empresa.cidade,
        'complemento': empresa.complemento,
        'bairro': empresa.bairro,
        'uf': empresa.uf,
      }
    }
    //empresa = await transform.item(empresa, Transformer)
    return response.send(empresa)
  }

  /**
   * Update empresa details.
   * PUT or PATCH empresas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    const trx = await Database.beginTransaction()
    try{
      var empresa = await Empresa.findOrFail(id)
      var endereco = await Endereco.findBy('empresa_id', id)
      const empresaData = request.only([
        'nome',
        'razao_social',
        'cnpj',
        'cnae',
        'telefone1',
        'telefone2',
        'inscricaoestadual',
        'inscricaomunicipal'
      ])

      const enderecoData = request.only([
        'endereco'
      ])

      empresa.merge(empresaData)
      await empresa.save(trx)
      if(endereco){
        endereco.merge(enderecoData.endereco)
        await endereco.save(trx)
        endereco = await transform.item(endereco, EnderecoTransformer)
      }else{
        // Cadastrando endereço
        var endereco = await Endereco.create({'empresa_id': id ,...enderecoData.endereco}, trx)
        endereco = await transform.item(endereco, EnderecoTransformer)
      }
      var empresa = Object.assign(empresa, endereco)
      empresa = await transform.item(empresa, EnderecoTransformer)
      trx.commit()
      return response.status(201).send(empresa);
    }catch(erro){
      trx.rollback()
      return response
      .status(400)
      .send({ message: 'Não foi possível atualizar esta empresa!' })
    }
  }

  /**
   * Delete a empresa with id.
   * DELETE empresas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const empresa = await Empresa.find(id)
    const endereco = await Endereco.findBy('empresa_id', id)
    try {
      await empresa.delete()
      if(endereco){
        await endereco.delete()
      }
      return response.status(204).send()
    } catch (error) {
      response
        .status(500)
        .send({ message: 'Não foi possível deletar esta empresa!' })
    }
  }
}

module.exports = EmpresaController
