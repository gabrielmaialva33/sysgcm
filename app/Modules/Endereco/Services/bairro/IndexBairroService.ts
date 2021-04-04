import Municipio from 'App/Modules/Endereco/Models/Municipio'
import Bairro from 'App/Modules/Endereco/Models/Bairro'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import AppException from 'App/Shared/Exceptions/AppException'

export class IndexBairroService {
  public async execute(search: string): Promise<Bairro[]> {
    const municipio_itarare = await Municipio.findBy('codigo_ibge', '3523206')
    if (!municipio_itarare) {
      throw new NotFoundException('Erro ao listar bairros: municipio não encontrado.')
    }

    try {
      return Bairro.query()
        .apply((scopes) => {
          scopes.scopeSearchQuery(search)
        })
        .where({
          municipio_id: municipio_itarare.id,
        })
        .orderBy('codigo_bairro', 'asc')
    } catch (error) {
      throw new AppException('Não foi possível listar os bairros, tente novamente mais tarde. ')
    }
  }
}
