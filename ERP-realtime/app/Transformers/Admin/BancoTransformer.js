'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * BancoTransformer class
 *
 * @class BancoTransformer
 * @constructor
 */
class BancoTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
      id: model.id,
      nome: model.nome,
      banco: model.banco,
      agencia: model.agencia,
      conta: model.conta,
      convenio: model.convenio,
      carteira: model.carteira,
      variacaocarteira: model.variacaocarteira,
      nossonumero: model.nossonumero,
      formatoremessa: model.formatoremessa,
      protesto: model.protesto,
      empresa_id: model.empresa_id
    }
  }
}

module.exports = BancoTransformer
