'use strict'

/*
|--------------------------------------------------------------------------
| ClientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role')
const User = use('App/Models/User')
const Empresa = use('App/Models/Empresa')
const Endereco = use('App/Models/Endereco')

class ClientSeeder {
  async run() {
    // const role = await Role.findBy('slug', 'client')
    // const clients = await Factory.model('App/Models/User').createMany(30)
    // await Promise.all(
    //   clients.map(async client => {
    //     await client.roles().attach([role.id])
    //   })
    // )

    const empresa = await Empresa.create({
      nome: 'Ambiente Solido',
      razao_social: 'Informatica LTDA',
    })

    const user = await User.create({
      name: 'admin',
      surname: 'surname',
      email: 'admin@gmail.com',
      password: 'admin1234',
      empresa_id: '1'
    })

    const endereco = await Endereco.create({
      uf: 'DF',
      user_id: '1',
    })

    const adminRole = await Role.findBy('slug', 'admin')
    await user.roles().attach([adminRole.id])
  }
}

module.exports = ClientSeeder
