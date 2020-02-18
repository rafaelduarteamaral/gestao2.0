'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FormaPagamentoSchema extends Schema {
  up () {
    this.create('forma_pagamentos', (table) => {
      table.increments()
      table.string('nome', 30)
      table.string('codigo', 20)
      table.string('liquidez', 1)
      table.timestamps()
    })
  }

  down () {
    this.drop('forma_pagamentos')
  }
}

module.exports = FormaPagamentoSchema
