import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidationFactory Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['password', 'email']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
