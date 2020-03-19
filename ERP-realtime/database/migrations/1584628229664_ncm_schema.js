'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NcmSchema extends Schema {
  up () {
    this.create('ncms', (table) => {
      table.increments()
      table.string('codigonbm', 15)
      table.string('codigoex', 15)
      table.string('cest', 15)
      table.string('nome', 150)
      table.string('aliquota', 20)
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
    this.drop('ncms')
  }
}

module.exports = NcmSchema
