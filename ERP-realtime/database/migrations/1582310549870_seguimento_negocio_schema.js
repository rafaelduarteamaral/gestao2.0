'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeguimentoNegocioSchema extends Schema {
  up () {
    this.create('seguimento_negocios', (table) => {
      table.increments()
      table.string('nome', 30)
      table.timestamps()
    })
  }

  down () {
    this.drop('seguimento_negocios')
  }
}

module.exports = SeguimentoNegocioSchema
