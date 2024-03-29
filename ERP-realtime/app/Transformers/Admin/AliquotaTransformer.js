'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * AliquotaTransformer class
 *
 * @class AliquotaTransformer
 * @constructor
 */
class AliquotaTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     nome: model.nome,
     aliquota: model.aliquota,
     empresa_id: model.empresa_id,
     pais_localidades_id: model.pais_localidades_id
    }
  }
}

module.exports = AliquotaTransformer
