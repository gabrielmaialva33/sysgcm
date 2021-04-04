import Endereco from 'App/Modules/Endereco/Models/Enderecos'

import AppException from 'App/Shared/Exceptions/AppException'

export class IndexEnderecoService {
  public async execute(search: string) {
    try {
      return await Endereco.query()
        .apply((scopes) => {
          scopes.scopeSearchQuery(search)
        })
        .whereNot({ codigo_endereco: null })
        .preload('bairro')
        .orderBy('codigo_endereco', 'asc')
    } catch (error) {
      throw new AppException('Erro ao listar endereços, tente novamente mais tarde.')
    }
  }
}
