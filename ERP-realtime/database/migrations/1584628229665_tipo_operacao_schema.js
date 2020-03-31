'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipoOperacaoSchema extends Schema {
  up () {
    this.create('tipo_operacaos', (table) => {
      table.increments()
      table.string('codigo', 10)
      table.enu('tipo', ['entrada', 'saida'])
      table.enu('icms', ['Normal', 'Substituicao', 'Outros'])
      table.string('nome', 50)
      table.string('cod_enquadramento_ipi', 8)
      table.text('descricao')
      table.string('csosn', 8)
      table.string('st_pis_cofins', 8)
      table.string('base_calculo_icms', 8)
      table.string('aliquota_pis', 8)
      table.string('aliquota_cofins', 8)
      table.string('aliquota_issqn', 8)
      table.integer('empresa_id').unsigned()

      table
      .foreign('empresa_id')
      .references('id')
      .inTable('empresas')
      .onDelete('cascade')
      table.integer('cfop_base_id').unsigned()
      table.integer('cst_origem_id').unsigned()
      table.integer('cst_tributacao_id').unsigned()
      
      table
      .foreign('cst_tributacao_id')
      .references('id')
      .inTable('cst_tributacaos')
      .onDelete('cascade')

      table
      .foreign('cfop_base_id')
      .references('id')
      .inTable('cfops')
      .onDelete('cascade')
      
      table
      .foreign('cst_origem_id')
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
