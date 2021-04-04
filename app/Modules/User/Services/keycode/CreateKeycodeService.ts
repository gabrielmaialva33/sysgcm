import { injectable, inject } from 'tsyringe'
import crypto from 'crypto'

import { IKeycodesRepository, IRolesRepository } from 'App/Modules/User/Interfaces'
import { IGcmsRepository } from 'App/Modules/Gcm/Interfaces/IGcmsRepository'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

interface IRequestData {
  gcm_id: string
  role_name: string
}

@injectable()
export class CreateKeycodeService {
  constructor(
    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository,

    @inject('KeycodesRepository')
    private keycodesRepository: IKeycodesRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository
  ) {}

  public async execute({ gcm_id, role_name }: IRequestData) {
    // -> check gcm exists
    const gcm_exists = await this.gcmsRepository.findById(gcm_id)
    if (!gcm_exists) {
      throw new NotFoundException('Erro no cadastro: Gcm não encontrado.')
    }

    const role_exists = await this.rolesRepository.findByName(role_name)
    if (!role_exists) {
      throw new NotFoundException('Erro no cadastro: Role não encontrada.')
    }

    const keycode = await this.keycodesRepository.create({
      gcm_id,
      keycode: await this.generateUniqueKeycode(4),
      role_name: role_exists.name,
    })

    return {
      gcm: gcm_exists,
      keycode: keycode.keycode,
    }
  }

  protected async generateUniqueKeycode(size: number) {
    let key = crypto.randomBytes(size).toString('hex').toLocaleUpperCase()

    // -> check key exists
    const key_exists = this.keycodesRepository.findByKeycode(key)
    if (key_exists) {
      key = await this.generateUniqueKeycode(size)
    }

    return key
  }
}
