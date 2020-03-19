'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * CfopTransformer class
 *
 * @class CfopTransformer
 * @constructor
 */
class CfopTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     nome: model.nome,
     codigo: model.codigo,
     descricao: model.descricao,
     empresa_id: model.empresa_id
    }
  }
}

module.exports = CfopTransformer
