'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FabricanteSchema extends Schema {
  up () {
    this.create('fabricantes', (table) => {
      table.increments()
      table.string('nome', 50)
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
    this.drop('fabricantes')
  }
}

module.exports = FabricanteSchema
