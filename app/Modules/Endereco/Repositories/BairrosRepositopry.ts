import Bairro from 'App/Modules/Endereco/Models/Bairro'

import { IBairrosRepository } from 'App/Modules/Endereco/Interfaces/IBairrosRepository'
import { ICreateBairroDTO } from 'App/Modules/Endereco/DTOs/ICreateBairroDTO'

export class BairrosRepository implements IBairrosRepository {
  public async index(): Promise<Bairro[]> {
    return Bairro.query().select('*').whereNot({ is_deleted: true })
  }

  public async create(data: ICreateBairroDTO): Promise<Bairro> {
    return await Bairro.create(data)
  }

  public async update(bairro: Bairro): Promise<Bairro> {
    return await bairro.save()
  }

  public async delete(bairro: Bairro): Promise<Bairro> {
    bairro.merge({ is_deleted: true })
    return await bairro.save()
  }

  public async findById(bairro_id: string): Promise<Bairro | null> {
    return await Bairro.findBy('id', bairro_id)
  }

  public async findByCodigoBairro(codigo_bairro: string): Promise<Bairro | null> {
    return await Bairro.findBy('codigo_bairro', codigo_bairro)
  }
}
