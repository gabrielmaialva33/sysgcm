import { IEstadosRepository } from 'App/Modules/Endereco/Interfaces/IEstadosRepository'
import Estado from 'App/Modules/Endereco/Models/Estado'

export class EstadosRepository implements IEstadosRepository {
  public async index(): Promise<Estado[]> {
    return Estado.query().select('*').orderBy('uf', 'asc')
  }
}
