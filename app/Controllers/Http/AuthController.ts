import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const token = await auth
      .use('api')
      .attempt(email, password, { expiresIn: '1 h', name: 'sysgcm' })

    return response.json({ user_id: await auth.user?.id, token: token.toJSON() })
  }
}