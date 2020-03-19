'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaisLocalidadesSchema extends Schema {
  up () {
    this.create('pais_localidades', (table) => {
      table.increments()
      table.string('pais', 30)
      table.string('cidades', 40)
      table.string('estados', 30)
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
    this.drop('pais_localidades')
  }
}

module.exports = PaisLocalidadesSchema
