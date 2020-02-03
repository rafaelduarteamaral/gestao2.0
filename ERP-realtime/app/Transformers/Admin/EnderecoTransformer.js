'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * EnderecoTransformer class
 *
 * @class EnderecoTransformer
 * @constructor
 */
class EnderecoTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id_endereco: model.id,
      user_id: model.user_id,
      cep: model.cep,
      cidade: model.cidade,
      rua: model.rua,
      bairro: model.bairro,
      complemento: model.complemento,
      uf: model.uf,
      casa: model.casa
    }
  }
}

module.exports = EnderecoTransformer
