import { inject, injectable } from 'tsyringe'

import Bairro from 'App/Modules/Endereco/Models/Bairro'
import Endereco from 'App/Modules/Endereco/Models/Enderecos'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import AppException from 'App/Shared/Exceptions/AppException'
import { IBairrosRepository, IEnderecosRepository } from 'App/Modules/Endereco/Interfaces'

@injectable()
export class DeleteBairroService {
  constructor(
    @inject('BairrosRepository')
    private bairrosRepository: IBairrosRepository,

    @inject('EnderecosRepository')
    private enderecosRepository: IEnderecosRepository
  ) {}

  public async execute(bairro_id: string): Promise<void> {
    const bairro = await this.bairrosRepository.findById(bairro_id)
    if (!bairro) {
      throw new NotFoundException('Erro ao excluir bairro: bairros não encontrado.')
    }

    const bairro_enderecos_exists = await Endereco.query()
      .select('id')
      .where('bairro_id', bairro_id)
    if (bairro_enderecos_exists.length !== 0) {
      throw new AppException('Erro ao excluir bairro: muitos endereço dependem desse bairro.')
    }

    try {
      await bairro.delete()
    } catch (error) {
      throw new AppException('Erro ao excluir bairro, tente novamente mais tarde.')
    }
  }
}
