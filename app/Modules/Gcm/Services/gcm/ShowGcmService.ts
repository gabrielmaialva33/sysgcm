import { inject, injectable } from 'tsyringe'

import { IGcmsRepository } from 'App/Modules/Gcm/Interfaces'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class ShowGcmService {
  constructor(
    @inject('GcmsRepository')
    private gcmsRepository: IGcmsRepository
  ) {}

  public async execute(gcm_id: string) {
    try {
      return this.gcmsRepository.findById(gcm_id)
    } catch (error) {
      throw new NotFoundException('Gcm não encontrado')
    }
  }
}
