import Municipio from 'App/Modules/Endereco/Models/Municipio'

export interface IRequestMunicipioParams {
  page: number
  search?: string
  state?: string
}

export interface IMunicipiosRepository {
  index({ page, search, state }: IRequestMunicipioParams): Promise<Municipio[]>
  findById(municipio_id: string | undefined): Promise<Municipio | null>
  findByCodigoIbge(codigo_ibge: string): Promise<Municipio | null>
}
