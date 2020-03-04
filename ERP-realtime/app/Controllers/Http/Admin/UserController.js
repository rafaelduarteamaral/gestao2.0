'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
const Endereco = use('App/Models/Endereco')
const Database = use('Database')
const Transformer = use('App/Transformers/Admin/UserTransformer')
const EnderecoTransformer = use('App/Transformers/Admin/EnderecoTransformer')
/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {object} ctx.pagination
   */
  async index({ request, response, pagination, transform, auth }) {
    const name = request.input('name')
    const query = User.query()
    const me = await auth.getUser()
    query.leftJoin('enderecos', 'users.id', 'enderecos.user_id')
    query.where('empresa_id', '=', me.empresa_id)
  
    if (name) {
      query.where('name', 'LIKE', `%${name}%`)
      query.orWhere('surname', 'LIKE', `%${name}%`)
      query.orWhere('email', 'LIKE', `%${name}%`)
    }

    query.select('users.*')
    query.select('enderecos.logradouro')
    query.select('enderecos.cep')
    query.select('enderecos.numero')
    query.select('enderecos.complemento')
    query.select('enderecos.bairro')
    query.select('enderecos.uf')
    query.select('enderecos.user_id')

    var users = await query.paginate(pagination.page, pagination.limit)
    users = await transform.paginate(users, Transformer)
    
    return response.send(users)
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    const trx = await Database.beginTransaction()
    try {
      const me = await auth.getUser()
      const userData = request.only([
        'name',
        'tipo',
        'surname',
        'email',
        'password',
        'image_id',
        'telefone1',
        'telefone2',
        'rg',
        'cnae',
        'dt_nascimento',
        'cpf_cnpj',
        'descricao',
        'empresa_id'
      ])

      const enderecoData = request.only([
        'endereco'
      ])

      // Cadastrando usuário
      var user = await User.create(userData, trx)
      user = await transform.item(user, Transformer)

      // Cadastrando endereço
      var endereco = await Endereco.create({'user_id': user.id,...enderecoData.endereco}, trx)
      endereco = await transform.item(endereco, EnderecoTransformer)

      // Preparando o retorno do usuário e endereco
      user.endereco = endereco
      trx.commit()

      return response.status(201).send({user})
    } catch (error) {

      trx.rollback()
      return response
        .status(400)
        .send(error)
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var user = await User.findOrFail(id)
    user = await transform.item(user, Transformer)
    var endereco = await Endereco.findBy('user_id', id)

    user = {
      'id': id,
      'image': user.image,
      'tipo': user.tipo,
      'name': user.name,
      'surname': user.surname,
      'email': user.email,
      'cpf_cnpj': user.cpf_cnpj,
      'rg': user.rg,
      'cnae': user.cnae,
      'dt_nascimento': user.dt_nascimento,
      'telefone1': user.telefone1,
      'telefone2': user.telefone2,
      'descricao': user.descricao,
      'endereco': {
        'logradouro': endereco.logradouro,
        'cep': endereco.cep,
        'numero': endereco.numero,
        'cidade': endereco.cidade,
        'complemento': endereco.complemento,
        'bairro': endereco.bairro,
        'uf': endereco.uf,
      }
    }

    
    return response.send(user)
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    const trx = await Database.beginTransaction()
    try{
      var user = await User.findOrFail(id)
      var endereco = await Endereco.findBy('user_id', id)
      const userData = request.only([
        'name',
        'tipo',
        'surname',
        'email',
        'password',
        'image_id',
        'telefone1',
        'telefone2',
        'rg',
        'cnae',
        'dt_nascimento',
        'cpf_cnpj',
        'descricao'
      ])
      const enderecoData = request.only([
        'endereco'
      ])
      user.merge(userData)
      await user.save(trx)
      if(endereco){
        endereco.merge(enderecoData.endereco)
        await endereco.save(trx)
        endereco = await transform.item(endereco, EnderecoTransformer)
      }else{
        // Cadastrando endereço
        var endereco = await Endereco.create({'user_id': id ,...enderecoData.endereco}, trx)
        endereco = await transform.item(endereco, EnderecoTransformer)
      }
      var user = Object.assign(user, endereco)
      user = await transform.item(user, Transformer)
      trx.commit()
      return response.status(201).send(user);
    }catch(erro){
      trx.rollback()
      return response
      .status(400)
      .send({ message: 'Não foi possível atualizar este Usuário!' })
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const user = await User.find(id)
    const endereco = await Endereco.findBy('user_id', id)
    try {
      await user.delete()
      if(endereco){
        await endereco.delete()
      }
      return response.status(204).send()
    } catch (error) {
      response
        .status(500)
        .send({ message: 'Não foi possível deletar este usuário!' })
    }
  }
}

module.exports = UserController
