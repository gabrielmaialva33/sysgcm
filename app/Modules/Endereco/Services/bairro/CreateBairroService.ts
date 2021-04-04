import { inject, injectable } from 'tsyringe'

import { IBairrosRepository } from 'App/Modules/Endereco/Interfaces/IBairrosRepository'
import { IMunicipiosRepository } from 'App/Modules/Endereco/Interfaces'
import { ICreateBairroDTO } from 'App/Modules/Endereco/DTOs/ICreateBairroDTO'

import AppException from 'App/Shared/Exceptions/AppException'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import ConflictException from 'App/Shared/Exceptions/ConflictException'

@injectable()
export class CreateBairroService {
  constructor(
    @inject('MunicipiosRepository')
    private municipiosRepository: IMunicipiosRepository,

    @inject('BairrosRepositopry')
    private bairrosRepository: IBairrosRepository
  ) {}

  public async execute(data: ICreateBairroDTO): Promise<{ bairro_id: string }> {
    const municipio_itarare_exists = await this.municipiosRepository.findByCodigoIbge('3523206')
    if (!municipio_itarare_exists) {
      throw new NotFoundException('Erro ao cadastrar bairro: municipio não encontrado.')
    }

    const codigo_bairro_exists = await this.bairrosRepository.findByCodigoBairro(data.codigo_bairro)
    if (codigo_bairro_exists) {
      throw new ConflictException('Erro ao cadastrar bairro: codigo do bairro já cadastrado.')
    }

    data.municipio_id = municipio_itarare_exists.id

    try {
      const new_bairro = await this.bairrosRepository.create(data)

      return { bairro_id: new_bairro.id }
    } catch (error) {
      throw new AppException('Erro ao cadastrar bairro, tente novamente mais tarde.')
    }
  }
}
