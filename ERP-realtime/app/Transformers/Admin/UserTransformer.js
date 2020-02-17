'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')
const ImageTransformer = use('App/Transformers/Admin/ImageTransformer')
/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends TransformerAbstract {
  defaultInclude() {
    return ['image']
  }
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      id: model.id,
      name: model.name,
      tipo: model.tipo,
      surname: model.surname,
      email: model.email,
      cpf_cnpj: model.cpf_cnpj,
      rg: model.rg,
      cnae: model.cnae,
      dt_nascimento: model.dt_nascimento,
      telefone1: model.telefone1,
      telefone2: model.telefone2,
      descricao: model.descricao,
      endereco: {
        logradouro: model.logradouro,
        cep: model.cep,
        numero: model.numero,
        cidade: model.cidade,
        complemento: model.complemento,
        bairro: model.bairro,
        uf: model.uf,
      }
    }
  }

  includeImage(user) {
    return this.item(user.getRelated('image'), ImageTransformer)
  }
}

module.exports = UserTransformer
