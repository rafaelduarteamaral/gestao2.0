'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CondicaoPagamentoSchema extends Schema {
  up () {
    this.create('condicao_pagamentos', (table) => {
      table.increments()
      table.string('nome', 30)
      table.integer('desconto').unsigned()
      table.integer('parcelas').unsigned()
      table.integer('dias').unsigned()
      table.integer('intervalo').unsigned()
      table.date('vencimento')
      table.string('forma_pagamento', 30)
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
    this.drop('condicao_pagamentos')
  }
}

module.exports = CondicaoPagamentoSchema
