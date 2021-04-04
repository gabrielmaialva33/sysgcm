import Endereco from 'App/Modules/Endereco/Models/Enderecos'
import Bairro from 'App/Modules/Endereco/Models/Bairro'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import ConflictException from 'App/Shared/Exceptions/ConflictException'
import AppException from 'App/Shared/Exceptions/AppException'

interface IRequestData {
  endereco_id: string
  logradouro?: string
  numero?: string
  complemento?: string
  cep?: string
  nome_local?: string
  codigo_endereco?: string
  observacao?: string
  bairros_id?: string
}

export class UpdateEnderecoService {
  public async execute({
    endereco_id,
    logradouro,
    numero,
    complemento,
    cep,
    nome_local,
    codigo_endereco,
    observacao,
    bairros_id,
  }: IRequestData): Promise<string> {
    const endereco_exists = await Endereco.findBy('id', endereco_id)
    if (!endereco_exists) {
      throw new NotFoundException('Erro ao atualizar informações: endereço não encontrado.')
    }

    if (codigo_endereco) {
      const codigo_endereco_exists = await Endereco.findBy('codigo_endereco', codigo_endereco)
      if (codigo_endereco_exists) {
        throw new ConflictException(
          'Erro ao atualizar informações: codigo do endereço já cadastrado.'
        )
      }
    }

    const bairro = await Bairro.findBy('id', bairros_id)
    if (!bairro) {
      throw new NotFoundException('Erro ao atualizar informações: bairro não encontrado.')
    }

    endereco_exists.merge({
      logradouro,
      numero,
      complemento,
      cep,
      nome_local,
      codigo_endereco,
      observacao,
      bairro_id: bairro.id,
    })

    try {
      await endereco_exists.save()

      return endereco_exists.id
    } catch (error) {
      throw new AppException(`Erro ao atualizar informações, tente novamente mais tarde.`)
    }
  }
}
