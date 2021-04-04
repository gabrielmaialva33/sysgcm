import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class CreateGcmEnderecoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    logradouro: schema.string({ escape: true }, [
      rules.required(),
      rules.maxLength(200),
      rules.minLength(3),
    ]),
    numero: schema.string.optional({ trim: true, escape: true }, [
      rules.minLength(1),
      rules.maxLength(4),
    ]),
    complemento: schema.string.optional({}, [rules.minLength(3), rules.maxLength(100)]),
    cep: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(8), rules.required()]),
  })

  public messages = {}
}
