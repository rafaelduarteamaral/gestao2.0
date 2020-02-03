'use strict'
const Endereco = use('App/Models/Endereco')
const Transformer = use('App/Transformers/Admin/EnderecoTransformer')

class EnderecoController {

  async store({ request, response, transform }) {
    try {
      const {user_id, cep, cidade, rua, bairro, complemento, uf, casa } = request.all()
      var endereco = await Endereco.create({
        user_id,
        cep,
        cidade,
        rua,
        bairro,
        complemento,
        uf,
        casa
      })
      endereco = await transform.item(endereco, Transformer)
      return response.status(201).send(endereco)
    } catch (error) {
      response
        .status(400)
        .send({message: 'Não foi possivel cadastrar o endereco neste momento!'})
    }
  }

  async show({ params: {id}, response, transform}) {
    try {
      var endereco = await Endereco.findOrFail(id)
      endereco = await transform.item(endereco, Transformer)
      return response.send(endereco)
    } catch (error) {
      return response
        .status(400)
        .send({message: 'Não possui endereço cadastrado!'})
    }
  }

  async showUserEndereco({ params: {id}, response, transform}) {
    try {
      var endereco = await Endereco.findByOrFail('user_id', id)
      endereco = await transform.item(endereco, Transformer)
      return response.send(endereco)
    } catch (error) {
      return response
        .status(400)
        .send({message: 'Não possui endereço cadastrado'})
    }
  }

  async update({ params: {id}, request, response, transform}) {
    var endereco = await Endereco.findByOrFail('user_id', id)
    try {
      const { user_id, cep, cidade, rua, bairro, complemento, uf, casa } = request.all()
      endereco.merge({ user_id, cep, cidade, rua, bairro, complemento, uf, casa })
      await endereco.save()
      endereco = await transform.item(endereco, Transformer)
      return response.send(endereco)
    } catch (error) {
      return response
        .status(400)
        .send({mensage: 'Não foi possível atualizar este endereco'})
    }
  }

  async destroy({ params: {id}, request, response }) {
    const endereco = await Endereco.findOrFail(id)
    try {
      await endereco.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ mensage: 'Não foi possível deletar o endereco!'})
    }
  }
}

module.exports = EnderecoController
