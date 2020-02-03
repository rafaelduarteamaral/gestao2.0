'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments()
      table.string('name', 80)
      table.string('surname', 200)
      table
        .string('email', 254)
        .notNullable()
        .unique()
      table.string('password', 60).notNullable()
      table.integer('image_id').unsigned()
      table.timestamps()
      table.string('cpf', 12)
      table.string('rg', 12)
      table.string('telefone1', 20)
      table.string('telefone2', 20)
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
