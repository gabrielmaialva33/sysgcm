import Estado from 'App/Modules/Endereco/Models/Estado'

export interface IEstadosRepository {
  index(): Promise<Estado[]>
}
