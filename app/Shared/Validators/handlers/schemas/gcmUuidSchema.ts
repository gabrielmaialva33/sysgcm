import { rules, schema } from '@ioc:Adonis/Core/Validator'

export const gcmUuidSchema = schema.create({
  user_id: schema.string({ trim: true, escape: true }, [
    rules.uuid(),
    rules.exists({ table: 'gcms', column: 'id', whereNot: { is_deleted: true } }),
  ]),
})
