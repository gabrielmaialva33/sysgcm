import { validator } from '@ioc:Adonis/Core/Validator'
import { userUuidSchema } from 'App/Shared/Validators/handlers/schemas/userUuidSchema'

export const uuidUserHandler = async (user_id: string) => {
  return await validator.validate({
    schema: userUuidSchema,
    data: { user_id },
    messages: {
      uuid: 'O parâmetro id não é um uuid invalido.',
      exists: 'O parâmetro id está desativado.',
    },
  })
}
