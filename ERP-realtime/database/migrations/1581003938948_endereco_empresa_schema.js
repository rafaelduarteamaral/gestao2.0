'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoEmpresaSchema extends Schema {
  up () {
    this.create('endereco_empresas', (table) => {
      table.increments()
      table.string('logradouro', 100)
      table.string('cep', 15)
      table.string('numero', 5)
      table.string('fuso_hr', 2)
      table.string('cidade', 80)
      table.string('complemento', 150)
      table.string('bairro', 150)
      table.string('uf', 2)
      table.integer('empresa_id').unsigned()
      table.timestamps()
      table
      .foreign('empresa_id')
      .references('id')
      .inTable('empresas')
      .onDelete('cascade')
    })
  }

  down () {
    this.drop('endereco_empresas')
  }
}

module.exports = EnderecoEmpresaSchema
