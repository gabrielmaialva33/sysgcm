import DadosPessoais from 'App/Modules/Gcm/Models/DadosPessoais'
import { ICreateDadosPessoaisDTO } from 'App/Modules/Gcm/DTOs/ICreateDadosPessoaisDTO'

export interface IDadosPessoaisRepository {
  create(data: ICreateDadosPessoaisDTO): Promise<DadosPessoais>
  update(dados_pessoais: DadosPessoais): Promise<DadosPessoais>
  findById(dados_pessoais_id: string): Promise<DadosPessoais | null>
  findByCpf(cpf: string): Promise<DadosPessoais | null>
  findByTituloEleitor(titulo_eleitor: string): Promise<DadosPessoais | null>
  findByCnh(cnh: string): Promise<DadosPessoais | null>
}
