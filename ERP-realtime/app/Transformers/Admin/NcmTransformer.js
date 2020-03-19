'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * NcmTransformer class
 *
 * @class NcmTransformer
 * @constructor
 */
class NcmTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     nome: model.nome,
     codigonbm: model.codigonbm,
     codigoex: model.codigoex,
     aliquota: model.aliquota,
     cest: model.cest,
     empresa_id: model.empresa_id
    }
  }
}

module.exports = NcmTransformer
