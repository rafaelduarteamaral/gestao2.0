'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * CondicaoPagamentoTransformer class
 *
 * @class CondicaoPagamentoTransformer
 * @constructor
 */
class CondicaoPagamentoTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id: model.id, 
      nome: model.nome, 
      desconto: model.desconto, 
      parcelas: model.parcelas, 
      dias: model.dias, 
      intervalo: model.intervalo, 
      vencimento: model.vencimento, 
      forma_pagamento: model.forma_pagamento, 
      empresa_id: model.empresa_id
     
    }
  }
}

module.exports = CondicaoPagamentoTransformer
