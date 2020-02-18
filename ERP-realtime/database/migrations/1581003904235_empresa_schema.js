'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmpresaSchema extends Schema {
  up () {
    this.create('empresas', (table) => {
      table.increments()
      table.string('nome', 50)
      table.string('razao_social', 100)
      table.string('cnpj', 15)
      table.string('cnae', 50)
      table.string('telefone1', 19)
      table.string('telefone2', 19)
      table.string('inscricaoestadual', 50)
      table.string('inscricaomunicipal', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('empresas')
  }
}

module.exports = EmpresaSchema
