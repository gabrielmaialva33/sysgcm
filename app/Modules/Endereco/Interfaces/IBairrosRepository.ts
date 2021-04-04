import Bairro from 'App/Modules/Endereco/Models/Bairro'
import { ICreateBairroDTO } from 'App/Modules/Endereco/DTOs/ICreateBairroDTO'

export interface IBairrosRepository {
  index(): Promise<Bairro[]>
  create(data: ICreateBairroDTO): Promise<Bairro>
  update(bairro: Bairro): Promise<Bairro>
  delete(bairro: Bairro): Promise<Bairro>
  findById(bairro_id: string): Promise<Bairro | null>
  findByCodigoBairro(codigo_bairro: string): Promise<Bairro | null>
}
