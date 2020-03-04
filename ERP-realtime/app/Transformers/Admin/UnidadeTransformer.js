'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * UnidadeTransformer class
 *
 * @class UnidadeTransformer
 * @constructor
 */
class UnidadeTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     nome: model.nome,
     abreviatura: model.abreviatura,
     empresa_id: model.empresa_id
    }
  }
}

module.exports = UnidadeTransformer
