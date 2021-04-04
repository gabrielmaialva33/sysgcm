import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateBairroValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    bairro: schema.string.optional({ escape: true }, []),
    codigo_bairro: schema.string.optional({ trim: true }, [rules.maxLength(6)]),
    observacao_bairro: schema.string.optional({ escape: true }, []),
    municipio_id: schema.string.optional({}, [
      rules.uuid(),
      rules.exists({ table: 'municipios', column: 'id' }),
    ]),
  })

  public messages = {}
}
