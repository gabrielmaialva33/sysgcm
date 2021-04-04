import { inject, injectable } from 'tsyringe'

import { ICreateDadosPessoaisDTO } from 'App/Modules/Gcm/DTOs'
import { IDadosPessoaisRepository } from 'App/Modules/Gcm/Interfaces'
import { IMunicipiosRepository } from 'App/Modules/Endereco/Interfaces'

import AppException from 'App/Shared/Exceptions/AppException'
import ConflictException from 'App/Shared/Exceptions/ConflictException'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class CreateDadosPessoaisService {
  constructor(
    @inject('DadosPessoaisRepository')
    private dadosPessoaisRepository: IDadosPessoaisRepository,

    @inject('MunicipiosRepository')
    private municipiosRepository: IMunicipiosRepository
  ) {}

  public async execute(data: ICreateDadosPessoaisDTO): Promise<string> {
    // -> checker  exists
    const cpf_exists = await this.dadosPessoaisRepository.findByCpf(data.cpf)
    if (cpf_exists) {
      throw new ConflictException('Cpf já cadastrado.')
    }

    if (data.titulo_eleitor) {
      const titulo_eleitor_exists = await this.dadosPessoaisRepository.findByTituloEleitor(
        data.titulo_eleitor
      )
      if (titulo_eleitor_exists) {
        throw new ConflictException('Titulo de eleitor já cadastrado.')
      }
    }

    if (data.cnh) {
      const chn_exists = await this.dadosPessoaisRepository.findByCnh(data.cnh)
      if (chn_exists) {
        throw new ConflictException('Carteira Nacional de Habilitação já cadastrada.')
      }
    }

    const municipio_exists = await this.municipiosRepository.findById(data.municipio_nascimento_id)
    if (!municipio_exists) {
      throw new NotFoundException('Municipio de nascimento não encontrado.')
    }

    // -> save on db
    try {
      const dados_pessoais = await this.dadosPessoaisRepository.create(data)

      return dados_pessoais.id
    } catch (error) {
      throw new AppException('Erro no cadastro: Não foi possível criar o GCM')
    }
  }
}
