'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * FormaPagamentoTransformer class
 *
 * @class FormaPagamentoTransformer
 * @constructor
 */
class FormaPagamentoTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     nome: model.nome,
     codigo: model.codigo,
     liquidez: model.liquidez ,
     empresa_id: model.empresa_id
    }
  }
}

module.exports = FormaPagamentoTransformer
