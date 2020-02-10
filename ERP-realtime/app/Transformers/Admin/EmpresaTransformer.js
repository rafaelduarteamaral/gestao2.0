'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * EmpresaTransformer class
 *
 * @class EmpresaTransformer
 * @constructor
 */
class EmpresaTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     // add your transformation object here
     id: model.id,
     nome: model.nome,
     razao_social: model.razao_social,
     cnpj: model.cnpj,
     cnae: model.cnae,
     inscricaoestadual: model.inscricaoestadual,
     inscricaomunicipal: model.inscricaomunicipal,
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
}

module.exports = EmpresaTransformer
