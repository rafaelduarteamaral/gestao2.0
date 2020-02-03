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
      price: model.price,
      titulo: model.titulo,
      category_id: model.category_id,
      ncm: model.ncm,
      tipo: model.tipo,
      estoqueMinimo: model.estoqueMinimo,
      custoCompras: model.custoCompras
    }
  }

  includeImage(model) {
    return this.item(model.getRelated('image'), ImageTransformer)
  }
}

module.exports = ProductTransformer
