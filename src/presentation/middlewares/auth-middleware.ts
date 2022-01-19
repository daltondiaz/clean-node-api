import { AccessDeniedError } from '../errors'
import { forbideen } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbideen(new AccessDeniedError())
    return await new Promise(resolve => resolve(error))
  }
}
