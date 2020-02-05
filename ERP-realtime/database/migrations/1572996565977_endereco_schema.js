'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoSchema extends Schema {
  up () {
    this.create('enderecos', (table) => {
      table.increments()
      table.string('logradouro', 100),
      table.string('cep', 15),
      table.string('numero', 5),
      table.string('cidade', 80),
      table.string('complemento', 150),
      table.string('bairro', 150),
      table.string('uf', 2),
      table.string('casa', 10),
      table.integer('user_id').unsigned()
      table.timestamps(),
      table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
    })
  }

  down () {
    this.drop('enderecos')
  }
}

module.exports = EnderecoSchema
