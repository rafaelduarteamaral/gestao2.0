'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * TipoOperacaoTransformer class
 *
 * @class TipoOperacaoTransformer
 * @constructor
 */
class TipoOperacaoTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     codigo: model.codigo,
     tipo: model.tipo,
     icms: model.icms,
     nome: model.nome,
     cod_enquadramento_ipi: model.cod_enquadramento_ipi,
     descricao: model.descricao,
     csosn: model.csosn,
     st_pis_cofins: model.st_pis_cofins,
     base_calculo_icms: model.base_calculo_icms,
     aliquota_pis: model.aliquota_pis,
     aliquota_cofins: model.aliquota_cofins,
     aliquota_issqn: model.aliquota_issqn,
     empresa_id: model.empresa_id
    }
  }
}

module.exports = TipoOperacaoTransformer
