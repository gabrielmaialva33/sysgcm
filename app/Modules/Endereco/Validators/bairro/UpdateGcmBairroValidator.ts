import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateGcmBairroValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    municipio_itarare: schema.boolean.optional([]),
    codigo_bairro: schema.string.optional({}, [
      rules.requiredWhen('municipio_itarare', '=', true),
      rules.exists({
        table: 'bairros',
        column: 'codigo_bairro',
        whereNot: { codigo_bairro: null },
      }),
      rules.minLength(3),
      rules.maxLength(6),
    ]),

    bairro: schema.string.optional({ escape: true }, [
      rules.requiredWhen('municipio_itarare', '=', false),
    ]),
    municipio_id: schema.string.optional({}, [
      rules.uuid(),
      rules.requiredWhen('municipio_itarare', '=', false),
      rules.exists({ table: 'municipios', column: 'id' }),
    ]),
  })

  public messages = {}
}
