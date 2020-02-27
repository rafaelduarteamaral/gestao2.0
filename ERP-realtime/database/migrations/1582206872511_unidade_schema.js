'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UnidadeSchema extends Schema {
  up () {
    this.create('unidades', (table) => {
      table.increments()
      table.string('nome', 70)
      table.string('abreviatura', 10)
      table.timestamps()
    })
  }

  down () {
    this.drop('unidades')
  }
}

module.exports = UnidadeSchema
