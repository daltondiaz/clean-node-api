import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication, makeDbAddAccount } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
