'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up() {
    this.create('products', table => {
      table.increments()
      table.string('name', 200)
      table.integer('image_id').unsigned()
      table.text('description')
      table.decimal('custoCompras', 12, 2)
      table.integer('category_id').unsigned()
      table.text('titulo')
      table.text('ncm')
      table.text('tipo')
      table.text('codigoBarras')
      table.text('listaServico')
      table.text('marca')
      table.text('endereco')
      table.text('material')
      table.text('operacaoEntrada')
      table.text('operacaoSaida')
      table.text('nSerie')
      table.text('familia')
      table.text('grupo')
      table.text('subgrupo')
      table.text('margemValorAgregado')
      table.decimal('saldoEstoque', 12, 2)
      table.decimal('valorEstoque', 12, 2)
      table.text('estoqueMinimo')
      table.decimal('precoComissao', 12, 2)
      table.decimal('custoCompra', 12, 2)
      table.decimal('icmsCompra', 12, 2)
      table.decimal('ipiCompra', 12, 2)
      table.decimal('custoFrete', 12, 2)
      table.decimal('precoFob', 12, 2)
      table.decimal('markup', 12, 2)
      table.decimal('precoVenda')
      table.decimal('icmsMedioVd', 12, 2)
      table.decimal('ipiVenda', 12, 2)
      table.decimal('mediaDescontos', 12, 2)
      table.decimal(' acrescimos', 12, 2)
      table.decimal('margemLucro', 12, 2)
      table.timestamps()
      table
        .foreign('image_id')
        .references('id')
        .inTable('images')
        .onDelete('cascade')
      table.integer('empresa_id').unsigned()
      table
        .foreign('empresa_id')
        .references('id')
        .inTable('empresas')
        .onDelete('cascade')
    })

    this.create('image_product', table => {
      table.increments()
      table.integer('image_id').unsigned()
      table.integer('product_id').unsigned()
      table
        .foreign('image_id')
        .references('id')
        .inTable('images')
        .onDelete('cascade')

      table
        .foreign('product_id')
        .references('id')
        .inTable('products')
        .onDelete('cascade')
    })

    this.create('category_product', table => {
      table.increments()
      table.integer('product_id').unsigned()
      table.integer('category_id').unsigned()

      table
        .foreign('product_id')
        .references('id')
        .inTable('products')
        .onDelete('cascade')

      table
        .foreign('category_id')
        .references('id')
        .inTable('categories')
        .onDelete('cascade')
    })
  }

  down() {
    this.drop('category_product')
    this.drop('image_product')
    this.drop('products')
  }
}

module.exports = ProductSchema
