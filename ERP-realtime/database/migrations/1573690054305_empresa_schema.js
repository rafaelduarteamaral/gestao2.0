'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmpresaSchema extends Schema {
  up () {
    this.create('empresas', (table) => {
      table.increments()
      table.string('nome', 100)
      table.string('razaosocial', 150)
      table.string('cnpj', 30)
      table.string('inscricaoestadual', 200)
      table.string('inscricaomunicipal', 200)
      table.timestamps()
    })
  }

  down () {
    this.drop('empresas')
  }
}

module.exports = EmpresaSchema
