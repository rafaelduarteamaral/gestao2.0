'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * TipoDocumentoTransformer class
 *
 * @class TipoDocumentoTransformer
 * @constructor
 */
class TipoDocumentoTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
        id: model.id,
        nome: model.nome,
        sigla: model.sigla,
        plano_de_contas: model.plano_de_contas,
        empresa_id: model.empresa_id
    }
  }
}
module.exports = TipoDocumentoTransformer
