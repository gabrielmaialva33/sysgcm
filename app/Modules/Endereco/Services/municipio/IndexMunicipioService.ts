import { inject, injectable } from 'tsyringe'

import { IMunicipiosRepository, IRequestMunicipioParams } from 'App/Modules/Endereco/Interfaces'

import AppException from 'App/Shared/Exceptions/AppException'

@injectable()
export class IndexMunicipioService {
  constructor(
    @inject('MunicipiosRepository')
    private municipiosRepository: IMunicipiosRepository
  ) {}

  public async execute({ page, search, state }: IRequestMunicipioParams) {
    try {
      return this.municipiosRepository.index({ page, search, state })
    } catch (error) {
      throw new AppException('Não foi possível listar os municípios, tente novamente mais tarde. ')
    }
  }
}
