'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * PlanejamentoFinanceiroTransformer class
 *
 * @class PlanejamentoFinanceiroTransformer
 * @constructor
 */
class PlanejamentoFinanceiroTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id: model.id,
      conta_financeira: model.conta_financeira,
      centro_custo: model.centro_custo,
      ano: model.ano,
      data_inicial: model.data_inicial,
      data_final: model.descricao,
      empresa_id: model.empresa_id,
    }
  }
}

module.exports = PlanejamentoFinanceiroTransformer
