import { container } from 'tsyringe'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {
  CreateDadosPessoaisValidator,
  UpdateDadosPessoaisValidator,
  CreateGcmValidator,
  UpdateGcmValidator,
  UpdateGcmBairroValidator,
  UpdateEnderecoValidator,
  CreateGcmEnderecoValidator,
  CreateBairroValidator,
} from 'App/Shared/Validators'

import {
  IndexGcmService,
  ShowGcmService,
  CreateEnderecoService,
  CreateBairroService,
  CreateGcmService,
  UpdateGcmService,
  UpdateBairroService,
  DeleteGcmService,
  CreateDadosPessoaisService,
  UpdateDadosPessoaisService,
} from 'App/Modules/Gcm/Services'

import { CreateKeycodeService } from 'App/Modules/User/Services'
import { UpdateEnderecoService } from 'App/Modules/Endereco/Services'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

import { uuidGcmHandler } from 'App/Shared/Validators'

export default class GcmsController {
  //* -> index
  public async index({ request, response }: HttpContextContract): Promise<void> {
    const search = request.input('search', '')

    const indexGcms = container.resolve(IndexGcmService)
    const gcms = await indexGcms.execute(search)

    return response.json(gcms)
  }

  //* -> show
  public async show({ request, response }: HttpContextContract): Promise<void> {
    const { id } = request.params()
    await uuidGcmHandler(id)

    const showGcm = container.resolve(ShowGcmService)
    const gcm = await showGcm.execute(id)

    return response.json(gcm)
  }

  //* -> create
  public async create({ request, response }: HttpContextContract): Promise<void> {
    const dados_pessoais_dto = await request.validate(CreateDadosPessoaisValidator)
    const bairro_dto = await request.validate(CreateBairroValidator)
    const endereco_dto = await request.validate(CreateGcmEnderecoValidator)
    const gcm_dto = await request.validate(CreateGcmValidator)
    const role_name = request.input('role_name')

    const createBairro = container.resolve(CreateBairroService)
    const bairro_id = await createBairro.execute(bairro_dto)

    const createEndereco = container.resolve(CreateEnderecoService)
    const endereco_id = await createEndereco.execute(endereco_dto, bairro_id)

    // -> create dados pessoais
    const createDadosPessoais = container.resolve(CreateDadosPessoaisService)
    const dados_pessoais_id = await createDadosPessoais.execute(dados_pessoais_dto)

    const createGcm = container.resolve(CreateGcmService)
    const gcm_id = await createGcm.execute({
      nome_guerra: gcm_dto.nome_guerra,
      dados_pessoais_id,
      endereco_id,
      atribuicao: gcm_dto.atribuicao,
    })

    const createKeycode = container.resolve(CreateKeycodeService)
    const keycode = await createKeycode.execute({ gcm_id, role_name })

    return response.json({ keycode })
  }

  //* -> update
  public async update({ request, response }: HttpContextContract): Promise<void> {
    const { id } = request.params()
    await uuidGcmHandler(id)

    const findGcmExists = container.resolve(ShowGcmService)

    const gcm_exists = await findGcmExists.execute(id)
    if (!gcm_exists) {
      throw new NotFoundException('Erro ao atualizar informações: gcm não encontrado.')
    }

    const bairro_dto = await request.validate(UpdateGcmBairroValidator)
    const endereco_dto = await request.validate(UpdateEnderecoValidator)
    const dados_pessoais_dto = await request.validate(UpdateDadosPessoaisValidator)
    const gcm_dto = await request.validate(UpdateGcmValidator)

    const updateBairro = container.resolve(UpdateBairroService)
    const bairro_id = await updateBairro.execute(
      {
        bairro: bairro_dto.bairro,
        codigo_bairro: bairro_dto.codigo_bairro,
        municipio_id: bairro_dto.municipio_id,
      },
      gcm_exists.endereco.bairro_id
    )

    const updateEndereco = container.resolve(UpdateEnderecoService)
    const endereco_id = await updateEndereco.execute({
      endereco_id: gcm_exists.endereco_id,
      logradouro: endereco_dto.logradouro,
      complemento: endereco_dto.complemento,
      cep: endereco_dto.cep,
      codigo_endereco: endereco_dto.codigo_endereco,
      bairros_id: bairro_id,
    })

    // -> update dados pessoais
    const updateDadosPessoais = container.resolve(UpdateDadosPessoaisService)
    const dados_pessoais_id = await updateDadosPessoais.execute({
      dados_pessoais_id: gcm_exists.dados_pessoais_id,
      nome: dados_pessoais_dto.nome,
      rg: dados_pessoais_dto.rg,
      cpf: dados_pessoais_dto.cpf,
      data_nascimento: dados_pessoais_dto.data_nascimento,
      telefone: dados_pessoais_dto.telefone,
      nome_mae: dados_pessoais_dto.nome_mae,
      nome_pai: dados_pessoais_dto.nome_pai,
      municipio_nascimento_id: dados_pessoais_dto.municipio_nascimento_id,
      sexo: dados_pessoais_dto.sexo,
      cutis: dados_pessoais_dto.cutis,
      tipo_sanguineo: dados_pessoais_dto.tipo_sanguineo,
      estado_civil: dados_pessoais_dto.estado_civil,
      profissao: dados_pessoais_dto.profissao,
      escolaridade: dados_pessoais_dto.escolaridade,
      nome_conjuge: dados_pessoais_dto.nome_conjuge,
      titulo_eleitor: dados_pessoais_dto.titulo_eleitor,
      zona_eleitoral: dados_pessoais_dto.zona_eleitoral,
      cnh: dados_pessoais_dto.cnh,
      tipo_cnh: dados_pessoais_dto.tipo_cnh,
      validade_cnh: dados_pessoais_dto.validade_cnh,
      observacao: dados_pessoais_dto.observacao,
    })

    // -> update gcm
    const updateGcm = container.resolve(UpdateGcmService)
    const gcm_id = await updateGcm.execute({
      gcm_id: gcm_exists.id,
      nome_guerra: gcm_dto.nome_guerra,
      dados_pessoais_id,
      endereco_id,
      atribuicao: gcm_dto.atribuicao,
      historico: gcm_dto.historico,
      status: gcm_dto.status,
    })

    return response.json(gcm_id)
  }

  //* -> delete
  public async delete({ request, response }: HttpContextContract): Promise<void> {
    const { id } = request.params()
    await uuidGcmHandler(id)

    const deleteGcm = container.resolve(DeleteGcmService)
    await deleteGcm.execute(id)

    return response.json('Gcm deletado com sucesso.')
  }
}
