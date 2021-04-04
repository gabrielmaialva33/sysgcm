import { rules, schema } from '@ioc:Adonis/Core/Validator'

export const userUuidSchema = schema.create({
  user_id: schema.string({ trim: true, escape: true }, [
    rules.uuid(),
    rules.exists({ table: 'users', column: 'id', whereNot: { is_deleted: true } }),
  ]),
})
