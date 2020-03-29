'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FiscalHistoricoSchema extends Schema {
  up () {
    this.create('fiscal_historicos', (table) => {
      table.increments()
      table.text('texto')
      table.boolean('ativo').defaultTo(false)
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
    this.drop('fiscal_historicos')
  }
}

module.exports = FiscalHistoricoSchema
