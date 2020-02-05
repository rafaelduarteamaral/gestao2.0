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
      cep: model.cep,
      cidade: model.cidade,
      bairro: model.bairro,
      complemento: model.complemento,
      uf: model.uf,
      logradouro: model.logradouro,
      numero: model.numero
    }
  }
}

module.exports = EnderecoTransformer
