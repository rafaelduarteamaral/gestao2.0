'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CstOrigemSchema extends Schema {
  up () {
    this.create('cst_origems', (table) => {
      table.increments()
      table.string('codigo', 10)
      table.string('nome', 20)
      table.text('descricao')
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
    this.drop('cst_origems')
  }
}

module.exports = CstOrigemSchema
