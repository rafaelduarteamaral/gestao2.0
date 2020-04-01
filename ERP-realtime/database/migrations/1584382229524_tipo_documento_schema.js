'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipoDocumentoSchema extends Schema {
  up () {
    this.create('tipo_documentos', (table) => {
      table.increments()
      table.string('nome', 70)
      table.string('sigla', 20)
      table.string('plano_de_contas', 9)
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
    this.drop('tipo_documentos')
  }
}

module.exports = TipoDocumentoSchema
