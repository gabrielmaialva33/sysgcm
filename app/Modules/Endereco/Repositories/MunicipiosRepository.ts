import Municipio from 'App/Modules/Endereco/Models/Municipio'

import { IMunicipiosRepository, IRequestMunicipioParams } from 'App/Modules/Endereco/Interfaces'

export class MunicipiosRepository implements IMunicipiosRepository {
  public async index({ page, search, state }: IRequestMunicipioParams) {
    return await Municipio.query()
      .apply((scopes) => {
        scopes.scopeSearchQuery(search, state)
      })
      .preload('estado')
      .orderBy('municipio', 'asc')
      .paginate(page, 20)
  }

  public async findById(municipio_id: string | undefined): Promise<Municipio | null> {
    return await Municipio.findBy('id', municipio_id)
  }

  public async findByCodigoIbge(codigo_ibge: string): Promise<Municipio | null> {
    return await Municipio.findBy('codigo_ibge', codigo_ibge)
  }
}
