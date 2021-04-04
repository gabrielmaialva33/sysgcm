import Bairro from 'App/Modules/Endereco/Models/Bairro'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import AppException from 'App/Shared/Exceptions/AppException'
import ConflictException from 'App/Shared/Exceptions/ConflictException'
import Municipio from 'App/Modules/Endereco/Models/Municipio'

interface IRequestBairroData {
  bairro_id: string
  bairro?: string
  codigo_bairro?: string
  observacao?: string
}

interface IRequestGcmData {
  bairro_id: string
  bairro?: string
  codigo_bairro?: string
  municipio_id?: string
}

export class UpdateBairroService {
  public async executeForBairro({
    bairro_id,
    bairro,
    codigo_bairro,
    observacao,
  }: IRequestBairroData): Promise<string> {
    // -> check bairro exists
    const bairro_exists = await Bairro.findBy('id', bairro_id)
    if (!bairro_exists) {
      throw new NotFoundException('Erro ao atualizar informações: bairro não encontrado.')
    }

    // -> check codigo_bairro exists
    if (codigo_bairro) {
      const codigo_bairro_exists = await Bairro.findBy('codigo_bairro', codigo_bairro)
      if (codigo_bairro_exists) {
        throw new ConflictException('Erro ao atualizar informações: codigo do bairro já existente.')
      }
    }

    bairro_exists.merge({
      bairro,
      codigo_bairro,
      observacao,
    })

    try {
      await bairro_exists.save()

      return bairro_exists.id
    } catch (error) {
      throw new AppException(`Erro ao atualizar informações, tente novamente mais tarde.`)
    }
  }

  public async executeForGcm({
    bairro_id,
    bairro,
    codigo_bairro,
    municipio_id,
  }: IRequestGcmData): Promise<string> {
    const bairro_exists = await Bairro.findBy('id', bairro_id)
    if (!bairro_exists) {
      throw new NotFoundException('Erro ao atualizar dados do gcm: bairro não encontrado.')
    }

    // -> return bairro_id
    if (codigo_bairro) {
      const bairro_exists = await Bairro.findBy('codigo_bairro', codigo_bairro)
      if (!bairro_exists) {
        throw new NotFoundException('Erro ao atualizar dados do gcm: bairro não encontrado.')
      }

      return bairro_exists.id
    }

    // -> check municipio exists
    if (municipio_id) {
      const municipio_exists = await Municipio.findBy('id', municipio_id)
      if (!municipio_exists) {
        throw new NotFoundException('Erro ao atualizar dados do gcm: município não encontrado.')
      }
    }

    bairro_exists.merge({
      bairro,
      municipio_id,
    })

    try {
      await bairro_exists.save()

      return bairro_exists.id
    } catch (error) {
      throw new AppException('Erro ao atualizar dados do gcm, tente novamente mais tarde.')
    }
  }
}
