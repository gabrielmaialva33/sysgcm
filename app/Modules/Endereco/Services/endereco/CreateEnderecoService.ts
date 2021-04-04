import Bairro from 'App/Modules/Endereco/Models/Bairro'
import Endereco from 'App/Modules/Endereco/Models/Enderecos'

import AppException from 'App/Shared/Exceptions/AppException'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import ConflictException from 'App/Shared/Exceptions/ConflictException'

interface IRequestEndereco {
  logradouro: string
  numero?: string
  complemento?: string
  cep: string
  codigo_endereco: string
  nome_local: string
  observacao?: string
  codigo_bairro: string
}

interface IRequestGcmData {
  logradouro: string
  numero?: string
  complemento?: string
  cep: string
  bairro_id: string
}

export class CreateEnderecoService {
  public async executeForEndereco({
    logradouro,
    numero,
    complemento,
    cep,
    nome_local,
    codigo_endereco,
    observacao,
    codigo_bairro,
  }: IRequestEndereco): Promise<string> {
    const bairro_exists = await Bairro.findBy('codigo_bairro', codigo_bairro)
    if (!bairro_exists) {
      throw new NotFoundException('Erro ao cadastrar endereço: bairro não encontrado.')
    }

    const codigo_endereco_exists = await Endereco.findBy('codigo_endereco', codigo_endereco)
    if (codigo_endereco_exists) {
      throw new ConflictException('Erro ao cadastrar endereço: codigo do endereço já cadastrado.')
    }

    try {
      const new_endereco = await Endereco.create({
        logradouro,
        numero,
        complemento,
        cep,
        nome_local,
        codigo_endereco,
        observacao,
        bairro_id: bairro_exists.id,
      })

      return new_endereco.id
    } catch (error) {
      throw new AppException('Erro ao cadastrar informações, tente novamente mais tarde.')
    }
  }

  public async executeForGcm({
    logradouro,
    numero,
    complemento,
    cep,
    bairro_id,
  }: IRequestGcmData): Promise<string> {
    const bairro_exists = await Bairro.findBy('id', bairro_id)
    if (!bairro_exists) {
      throw new NotFoundException('Erro ao cadastrar gcm: bairro não encontrado.')
    }

    try {
      const new_endereco = await Endereco.create({
        logradouro,
        numero,
        complemento,
        cep,
        bairro_id,
      })

      return new_endereco.id
    } catch (error) {
      throw new AppException('Erro ao cadastrar gcm, tente novamente mais tarde.')
    }
  }
}
