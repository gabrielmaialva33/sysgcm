import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class CreateNewBairroValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    codigo_bairro: schema.string({}, [
      rules.unique({
        table: 'bairros',
        column: 'codigo_bairro',
      }),
      rules.minLength(3),
      rules.maxLength(6),
    ]),
    bairro: schema.string({ escape: true }, []),
    observacao: schema.string.optional({ escape: true }, []),
  })

  public messages = {}
}
