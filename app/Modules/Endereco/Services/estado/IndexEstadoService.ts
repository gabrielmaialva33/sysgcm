import { inject, injectable } from 'tsyringe'

import { IEstadosRepository } from 'App/Modules/Endereco/Interfaces/IEstadosRepository'

import AppException from 'App/Shared/Exceptions/AppException'

@injectable()
export class IndexEstadoService {
  constructor(
    @inject('EstadosRepository')
    private estadosRepository: IEstadosRepository
  ) {}

  public async execute() {
    try {
      return this.estadosRepository.index()
    } catch (error) {
      throw new AppException('Não foi possível listar os estados, tente novamente mais tarde. ')
    }
  }
}
