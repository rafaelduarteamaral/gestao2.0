'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipoOperacaoSchema extends Schema {
  up () {
    this.create('tipo_operacaos', (table) => {
      table.increments()
      table.string('codigo', 10)
      table.enu('tipo', ['entrada', 'saida'])
      table.string('nome', 50)
      table.text('descricao')
      table.integer('empresa_id').unsigned()
      table
      .foreign('empresa_id')
      .references('id')
      .inTable('empresas')
      .onDelete('cascade')
      table.integer('cfopBase_id').unsigned()
      table.integer('cstOrigem_id').unsigned()
      table
      .foreign('cfopBase_id')
      .references('id')
      .inTable('cfops')
      .onDelete('cascade')
      table
      .foreign('cstOrigem_id')
      .references('id')
      .inTable('cst_origems')
      .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('tipo_operacaos')
  }
}

module.exports = TipoOperacaoSchema
