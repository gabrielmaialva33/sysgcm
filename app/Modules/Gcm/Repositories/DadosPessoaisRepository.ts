import DadosPessoais from 'App/Modules/Gcm/Models/DadosPessoais'

import { IDadosPessoaisRepository } from 'App/Modules/Gcm/Interfaces'
import { ICreateDadosPessoaisDTO } from 'App/Modules/Gcm/DTOs'

export class DadosPessoaisRepository implements IDadosPessoaisRepository {
  public async create(data: ICreateDadosPessoaisDTO): Promise<DadosPessoais> {
    return await DadosPessoais.create(data)
  }

  public async update(dados_pessoais: DadosPessoais): Promise<DadosPessoais> {
    return await dados_pessoais.save()
  }

  public async findById(dados_pessoais_id: string): Promise<DadosPessoais | null> {
    return await DadosPessoais.findBy('id', dados_pessoais_id)
  }

  public async findByCpf(cpf: string): Promise<DadosPessoais | null> {
    return await DadosPessoais.findBy('cpf', cpf)
  }

  public async findByTituloEleitor(titulo_eleitor: string): Promise<DadosPessoais | null> {
    return await DadosPessoais.findBy('titulo_eleitor', titulo_eleitor)
  }

  public async findByCnh(cnh: string): Promise<DadosPessoais | null> {
    return await DadosPessoais.findBy('cnh', cnh)
  }
}
