import { inject, injectable } from 'tsyringe'

import { IUpdateDadosPessoaisDTO } from 'App/Modules/Gcm/DTOs'
import { IDadosPessoaisRepository } from 'App/Modules/Gcm/Interfaces'
import { IMunicipiosRepository } from 'App/Modules/Endereco/Interfaces'

import AppException from 'App/Shared/Exceptions/AppException'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class UpdateDadosPessoaisService {
  constructor(
    @inject('DadosPessoaisRepository')
    private dadosPessoaisRepository: IDadosPessoaisRepository,

    @inject('MunicipiosRepository')
    private municipiosRepository: IMunicipiosRepository
  ) {}

  public async execute(data: IUpdateDadosPessoaisDTO) {
    const dados_pessoais_exists = await this.dadosPessoaisRepository.findById(
      data.dados_pessoais_id
    )
    if (!dados_pessoais_exists) {
      throw new NotFoundException('Erro ao atualizar informações: dados pessoais não encontrado.')
    }

    const municipio_exists = await this.municipiosRepository.findById(data.municipio_nascimento_id)
    if (!municipio_exists) {
      throw new NotFoundException(
        'Erro ao atualizar informações: cidade nascimento não encontrada.'
      )
    }

    dados_pessoais_exists.merge(data)

    try {
      await this.dadosPessoaisRepository.update(dados_pessoais_exists)

      return dados_pessoais_exists.id
    } catch (error) {
      throw new AppException(`Erro ao atualizar informações: ${error}.`)
    }
  }
}
