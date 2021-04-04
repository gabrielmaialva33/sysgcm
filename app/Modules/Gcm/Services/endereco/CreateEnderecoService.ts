import { inject, injectable } from 'tsyringe'

import { IBairrosRepository, IEnderecosRepository } from 'App/Modules/Endereco/Interfaces'
import { ICreateEnderecoDTO } from 'App/Modules/Gcm/DTOs'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import AppException from 'App/Shared/Exceptions/AppException'

@injectable()
export class CreateEnderecoService {
  constructor(
    @inject('EnderecosRepository')
    private enderecosRepository: IEnderecosRepository,

    @inject('BairrosRepository')
    private bairrosRepository: IBairrosRepository
  ) {}

  public async execute(data: ICreateEnderecoDTO, bairro_id: string): Promise<string> {
    const bairro_exists = await this.bairrosRepository.findById(bairro_id)
    if (!bairro_exists) {
      throw new NotFoundException('Erro ao cadastrar gcm: bairro não encontrado.')
    }

    try {
      const new_endereco = await this.enderecosRepository.create(data)

      return new_endereco.id
    } catch (error) {
      throw new AppException('Erro ao cadastrar gcm, tente novamente mais tarde.')
    }
  }
}
