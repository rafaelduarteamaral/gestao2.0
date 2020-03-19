'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AliquotasSchema extends Schema {
  up () {
    this.create('aliquotas', (table) => {
      table.increments()
      table.string('nome', 40)
      table.string('aliquota', 30)
      table.integer('pais_localidades_id').unsigned()
      table.integer('empresa_id').unsigned()
      table
      .foreign('empresa_id')
      .references('id')
      .inTable('empresas')
      .onDelete('cascade')
      table
      .foreign('pais_localidades_id')
      .references('id')
      .inTable('pais_localidades')
      .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('aliquotas')
  }
}

module.exports = AliquotasSchema
