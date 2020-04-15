'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MovimentoBancarioSchema extends Schema {
    up() {
        this.create('movimento_bancarios', (table) => {
            table.increments()
            table.string('banco_debito', 40)
            table.string('banco_credito', 30)
            table.integer('valor').unsigned()
            table.date('data_lancamento')
            table.string('descricao', 150)
            table.integer('empresa_id').unsigned()
            table
                .foreign('empresa_id')
                .references('id')
                .inTable('empresas')
                .onDelete('cascade')
            table.integer('bancos_id').unsigned();
            table
                .foreign('bancos_id')
                .references('id')
                .inTable('bancos')
                .onDelete('cascade')
            table.timestamps()
        })
    }
  up () {
    this.create('movimento_bancarios', (table) => {
      table.increments()
      table.string('banco_debito', 40)
      table.string('banco_credito', 30)
      table.integer('valor').unsigned()
      table.date('data_lancamento')
      table.string('descricao', 150)
      table.integer('empresa_id').unsigned()
      table
      .foreign('empresa_id')
      .references('id')
      .inTable('empresas')
      .onDelete('cascade')
      table.integer('bancos_id').unsigned()
      table
      .foreign('bancos_id')
      .references('id')
      .inTable('bancos')
      .onDelete('cascade')
      table.timestamps()
    })
  }

    down() {
        this.drop('movimento_bancarios')
    }
}

module.exports = MovimentoBancarioSchema