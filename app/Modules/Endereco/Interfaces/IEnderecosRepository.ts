import Endereco from 'App/Modules/Endereco/Models/Enderecos'
import { ICreateEnderecoDTO } from 'App/Modules/Endereco/DTOs'

export interface IEnderecosRepository {
  create(data: ICreateEnderecoDTO): Promise<Endereco>
  findById(endereco_id: string): Promise<Endereco | null>
  checkDelete(bairro_id: string): Promise<Endereco[] | null>
}
