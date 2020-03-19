'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CfopSchema extends Schema {
  up () {
    this.create('cfops', (table) => {
      table.increments()
      table.string('codigo', 10)
      table.string('nome', 150)
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
    this.drop('cfops')
  }
}

module.exports = CfopSchema
