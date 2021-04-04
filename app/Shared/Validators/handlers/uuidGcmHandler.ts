import { validator } from '@ioc:Adonis/Core/Validator'
import { gcmUuidSchema } from 'App/Shared/Validators/handlers/schemas/gcmUuidSchema'

export const uuidGcmHandler = async (gcm_id: string) => {
  return await validator.validate({
    schema: gcmUuidSchema,
    data: { gcm_id },
    messages: {
      uuid: 'O parâmetro id não é um uuid invalido.',
      exists: 'O parâmetro id está desativado.',
    },
  })
}
