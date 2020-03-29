'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * FiscalHistoricoTransformer class
 *
 * @class FiscalHistoricoTransformer
 * @constructor
 */
class FiscalHistoricoTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     texto: model.texto,
     ativo: model.ativo,
     empresa_id: model.empresa_id
    }
  }
}

module.exports = FiscalHistoricoTransformer
