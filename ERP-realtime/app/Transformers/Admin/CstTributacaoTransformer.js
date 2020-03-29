'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * CstTributacaoTransformer class
 *
 * @class CstTributacaoTransformer
 * @constructor
 */
class CstTributacaoTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      // add your transformation object here
      id: model.id,
      nome: model.nome,
      codigo: model.codigo,
      beneficio: model.beneficio,
      descricao: model.descricao,
      empresa_id: model.empresa_id
    }
  }
}

module.exports = CstTributacaoTransformer
