'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const ImageTransformer = use('App/Transformers/Admin/ImageTransformer')

/**
 * ProductTransformer class
 *
 * @class ProductTransformer
 * @constructor
 */
class ProductTransformer extends TransformerAbstract {
  defaultInclude() {
    return ['image']
  }
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      titulo: model.titulo,
      category_id: model.category_id,
      ncm: model.ncm,
      tipo: model.tipo,
      custoCompras: model.custoCompras,
      codigoBarras: model.codigoBarras,
      listaServico: model.listaServico,
      marca: model.marca,
      endereco: model.endereco,
      material: model.material,
      operacaoEntrada: model.operacaoEntrada,
      operacaoSaida: model.operacaoSaida,
      nSerie: model.nSerie,
      familia: model.familia,
      grupo: model.grupo,
      subgrupo: model.subgrupo,
      margemValorAgregado: model.margemValorAgregado,
      saldoEstoque: model.saldoEstoque,
      valorEstoque: model.valorEstoque,
      estoqueMinimo: model.estoqueMinimo,
      precoComissao: model.precoComissao,
      custoCompra: model.custoCompra,
      icmsCompra: model.icmsCompra,
      ipiCompra: model.ipiCompra,
      custoFrete: model.custoFrete,
      precoFob: model.precoFob,
      markup: model.markup,
      precoVenda: model.precoVenda,
      icmsMedioVd: model.icmsMedioVd,
      ipiVenda: model.ipiVenda,
      mediaDescontos: model.mediaDescontos,
      acrescimos: model.acrescimos,
      margemLucro: model.margemLucro,
      empresa_id: model.empresa_id
    }
  }

  includeImage(model) {
    return this.item(model.getRelated('image'), ImageTransformer)
  }
}

module.exports = ProductTransformer
