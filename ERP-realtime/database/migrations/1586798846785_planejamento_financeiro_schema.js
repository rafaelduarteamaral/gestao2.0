'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlanejamentoFinanceiroSchema extends Schema {
  up () {
    this.create('planejamento_financeiros', (table) => {
      table.increments()
        table.string('conta_financeira', 40)
        table.string('centro_custo', 30)
        table.string('ano', 30)
        table.date('data_inicial')
        table.date('data_final')
        table.string('bloq_movimento', 150)
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
    this.drop('planejamento_financeiros')
  }
}

module.exports = PlanejamentoFinanceiroSchema
