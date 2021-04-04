import { inject, injectable } from 'tsyringe'

import { IBairrosRepository, IMunicipiosRepository } from 'App/Modules/Endereco/Interfaces'
import { IUpdateBairroDTO } from 'App/Modules/Gcm/DTOs'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import AppException from 'App/Shared/Exceptions/AppException'

@injectable()
export class UpdateBairroService {
  constructor(
    @inject('BairrosRepository')
    private bairrosRepository: IBairrosRepository,

    @inject('MunicipiosRepository')
    private municipiosRepository: IMunicipiosRepository
  ) {}

  public async execute(
    { bairro, codigo_bairro, municipio_id }: IUpdateBairroDTO,
    bairro_id: string
  ): Promise<string> {
    const bairro_exists = await this.bairrosRepository.findById(bairro_id)
    if (!bairro_exists) {
      throw new NotFoundException('Erro ao atualizar dados do gcm: bairro não encontrado.')
    }

    if (codigo_bairro) {
      const bairro_exists = await this.bairrosRepository.findByCodigoBairro(codigo_bairro)
      if (!bairro_exists) {
        throw new NotFoundException('Erro ao atualizar dados do gcm: bairro não encontrado.')
      }
      return bairro_exists.id
    }

    if (municipio_id) {
      const municipio_exists = await this.municipiosRepository.findById(municipio_id)
      if (!municipio_exists) {
        throw new NotFoundException('Erro ao atualizar dados do gcm: município não encontrado.')
      }
    }

    bairro_exists.merge({
      bairro,
      municipio_id,
    })

    try {
      await this.bairrosRepository.update(bairro_exists)

      return bairro_exists.id
    } catch (error) {
      throw new AppException('Erro ao atualizar dados do gcm, tente novamente mais tarde.')
    }
  }
}
