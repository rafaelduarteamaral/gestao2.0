'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CstTributacaoSchema extends Schema {
  up () {
    this.create('cst_tributacaos', (table) => {
      table.increments()
      table.string('codigo', 10)
      table.string('nome', 150)
      table.text('descricao')
      table.string('beneficio', 30)
      table.integer('empresa_id').unsigned()
      table
      .foreign('empresa_id')
      .references('id')
      .inTable('empresas')
      .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('cst_tributacaos')
  }
}

module.exports = CstTributacaoSchema
