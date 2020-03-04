'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BancoSchema extends Schema {
  up () {
    this.create('bancos', (table) => {
      table.increments()
      table.string('nome', 150)
      table.string('banco')
      table.string('agencia', 11)
      table.string('conta', 20)
      table.string('convenio', 20)
      table.string('carteira', 20)
      table.string('variacaocarteira', 20)
      table.string('nossonumero', 20)
      table.string('formatoremessa', 20)
      table.string('protesto', 20)
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
    this.drop('bancos')
  }
}

module.exports = BancoSchema
