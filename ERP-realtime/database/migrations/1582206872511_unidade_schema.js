'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UnidadeSchema extends Schema {
  up () {
    this.create('unidades', (table) => {
      table.increments()
      table.string('nome', 70)
      table.string('abreviatura', 10)
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
    this.drop('unidades')
  }
}

module.exports = UnidadeSchema
