import Endereco from 'App/Modules/Endereco/Models/Enderecos'

import { IEnderecosRepository } from 'App/Modules/Endereco/Interfaces'
import { ICreateEnderecoDTO } from 'App/Modules/Endereco/DTOs'

export class EnderecosRepository implements IEnderecosRepository {
  public async create(data: ICreateEnderecoDTO): Promise<Endereco> {
    return await Endereco.create(data)
  }

  public async findById(endereco_id: string): Promise<Endereco | null> {
    return Endereco.findBy('id', endereco_id)
  }

  public async checkDelete(bairro_id: string): Promise<Endereco[] | null> {
    return Endereco.query().select('id').where('bairro_id', bairro_id)
  }
}
