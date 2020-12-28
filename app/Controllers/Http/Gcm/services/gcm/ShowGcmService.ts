import Gcm from 'App/Models/Gcm/Gcm'
import NotFoundException from 'App/Exceptions/NotFoundException'

class ShowGcmService {
  public async execute(gcm_id: string) {
    const gcm_exists = await Gcm.query()
      .where('id', gcm_id)
      .where('status', true)
      .preload('dados_pessoais')
      .preload('endereco', (query) => {
        query.preload('bairro', (query) => {
          query.preload('municipio', (query) => {
            query.preload('estado')
          })
        })
      })
      .first()

    if (!gcm_exists) {
      throw new NotFoundException('Gcm não encontrado')
    }

    return gcm_exists
  }
}

export default new ShowGcmService()
