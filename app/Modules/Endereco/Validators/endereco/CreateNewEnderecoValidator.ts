import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class CreateNewEnderecoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    logradouro: schema.string({ escape: true }, [rules.minLength(3), rules.maxLength(200)]),
    numero: schema.string.optional({ trim: true, escape: true }, [
      rules.minLength(1),
      rules.maxLength(4),
    ]),
    complemento: schema.string.optional({}, [rules.minLength(3), rules.maxLength(100)]),
    cep: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(8)]),
    nome_local: schema.string({}, [rules.minLength(2), rules.maxLength(40)]),
    codigo_endereco: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(6),
      rules.unique({ table: 'enderecos', column: 'codigo_endereco' }),
    ]),
    observacao: schema.string.optional({ escape: true }, []),
    codigo_bairro: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(6),
      rules.exists({
        table: 'bairros',
        column: 'codigo_bairro',
        whereNot: { codigo_bairro: null },
      }),
    ]),
  })

  public messages = {}
}
