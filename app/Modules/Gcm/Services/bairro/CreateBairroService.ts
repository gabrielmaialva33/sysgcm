import { inject, injectable } from 'tsyringe'

import { IBairrosRepository, IMunicipiosRepository } from 'App/Modules/Endereco/Interfaces'
import { ICreateBairroDTO } from 'App/Modules/Gcm/DTOs'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import AppException from 'App/Shared/Exceptions/AppException'

@injectable()
export class CreateBairroService {
  constructor(
    @inject('MunicipiosRepository')
    private municipiosRepository: IMunicipiosRepository,

    @inject('BairrosRepository')
    private bairrosRepository: IBairrosRepository
  ) {}

  public async execute(data: ICreateBairroDTO): Promise<string> {
    if (data.municipio_itarare && data.codigo_bairro) {
      const bairro_exists = await this.bairrosRepository.findByCodigoBairro(data.codigo_bairro)
      if (!bairro_exists) {
        throw new NotFoundException('Erro ao cadastrar gcm: bairro não encontrado.')
      }

      return bairro_exists.id
    }

    if (data.municipio_id) {
      const municipio_exists = await this.municipiosRepository.findById(data.municipio_id)
      if (!municipio_exists) {
        throw new NotFoundException('Erro ao cadastrar gcm: municipio não encontrado.')
      }
    }

    if (!data.bairro || !data.municipio_id) {
      throw new NotFoundException('Erro ao cadastrar gcm: dados não encontrado.')
    }

    try {
      const new_bairro = await this.bairrosRepository.create({
        codigo_bairro: '',
        bairro: data.bairro,
        municipio_id: data.municipio_id,
      })

      return new_bairro.id
    } catch (error) {
      throw new AppException('Erro ao cadastrar gcm, tente novamente mais tarde.')
    }
  }
}
