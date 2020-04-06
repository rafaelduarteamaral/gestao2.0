'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * MovimentoBancarioTransformer class
 *
 * @class MovimentoBancarioTransformer
 * @constructor
 */
class MovimentoBancarioTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id: model.id,
      banco_debito: model.banco_debito,
      banco_credito: model.banco_credito,
      valor: model.valor,
      data_lancamento: model.data_lancamento,
      descricao: model.descricao,
      empresa_id: model.empresa_id,
      bancos_id: model.bancos_id
    }
  }
}

module.exports = MovimentoBancarioTransformer
