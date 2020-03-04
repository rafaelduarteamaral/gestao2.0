'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Product = use('App/Models/Product')
const Transformer = use('App/Transformers/Admin/ProductTransformer')
/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, pagination, transform, auth }) {
    const name = request.input('name')
    const query = Product.query()
    const me = await auth.getUser()
    query.where('empresa_id', '=', me.empresa_id)

    if (name) {
      query.where('name', 'LIKE', `%${name}%`)
    }
    var products = await query.paginate(pagination.page, pagination.limit)
    products = await transform.paginate(products, Transformer)
    return response.send(products)
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform, auth }) {
    try {
      const me = await auth.getUser()
      const { 
        name, 
        description, 
        image_id, 
        titulo, 
        category_id, 
        ncm,
        codigoBarras,
        listaServico, 
        tipo, 
        custoCompras,
        marca,
        endereco,
        material,
        operacaoEntrada,
        operacaoSaida,
        nSerie,
        familia,
        grupo,
        subgrupo,
        margemValorAgregado,
        saldoEstoque,
        valorEstoque,
        estoqueMinimo,
        precoComissao,
        custoCompra,
        icmsCompra,
        ipiCompra,
        custoFrete,
        precoFob,
        markup,
        precoVenda,
        icmsMedioVd,
        ipiVenda,
        mediaDescontos,
        acrescimos,
        margemLucro,
      } = request.all()
      var product = await Product.create({
        name, 
        description, 
        image_id, 
        titulo, 
        category_id, 
        ncm,
        codigoBarras,
        listaServico,
        tipo, 
        custoCompras,
        marca,
        endereco,
        material,
        operacaoEntrada,
        operacaoSaida,
        nSerie,
        familia,
        grupo,
        subgrupo,
        margemValorAgregado,
        saldoEstoque,
        valorEstoque,
        estoqueMinimo,
        precoComissao,
        custoCompra,
        icmsCompra,
        ipiCompra,
        custoFrete,
        precoFob,
        markup,
        precoVenda,
        icmsMedioVd,
        ipiVenda,
        mediaDescontos,
        acrescimos,
        margemLucro,
        empresa_id: me.empresa_id
      })
      product = await transform.item(product, Transformer)
      return response.status(201).send(product)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possível criar o produto neste momento!' })
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    var product = await Product.findOrFail(id)
    product = await transform.item(product, Transformer)
    return response.send(product)
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    var product = await Product.findOrFail(id)
    try {
      const { 
        name, 
        description, 
        image_id, 
        titulo, 
        category_id, 
        tipo, 
        custoCompras,
        ncm,
        codigoBarras,
        listaServico, 
        marca,
        endereco,
        material,
        operacaoEntrada,
        operacaoSaida,
        nSerie,
        familia,
        grupo,
        subgrupo,
        margemValorAgregado,
        saldoEstoque,
        valorEstoque,
        estoqueMinimo,
        precoComissao,
        custoCompra,
        icmsCompra,
        ipiCompra,
        custoFrete,
        precoFob,
        markup,
        precoVenda,
        icmsMedioVd,
        ipiVenda,
        mediaDescontos,
        acrescimos,
        margemLucro,
       } = request.all()
      product.merge({
        name, 
        description, 
        image_id, 
        titulo, 
        category_id, 
        tipo, 
        custoCompras,
        ncm,
        codigoBarras,
        listaServico,
        marca,
        endereco,
        material,
        operacaoEntrada,
        operacaoSaida,
        nSerie,
        familia,
        grupo,
        subgrupo,
        margemValorAgregado,
        saldoEstoque,
        valorEstoque,
        estoqueMinimo,
        precoComissao,
        custoCompra,
        icmsCompra,
        ipiCompra,
        custoFrete,
        precoFob,
        markup,
        precoVenda,
        icmsMedioVd,
        ipiVenda,
        mediaDescontos,
        acrescimos,
        margemLucro,
       })
      await product.save()
      product = await transform.item(product, Transformer)
      return response.send(product)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possível atualizar este produto!' })
    }
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const product = await Product.findOrFail(id)
    try {
      await product.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possível deletar este produto!' })
    }
  }
}

module.exports = ProductController
