import { mockAccountModel } from '@/tests/domain/mocks'
import { AddAccount, LoadAccountByToken, Authentication } from '@/domain/usecases'
import { AccountModel } from '@/domain/models/account'
import { faker } from '@faker-js/faker'

export class AddAccountSpy implements AddAccount {
  addAccountParams: AddAccount.Params
  isValid = true
  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = account
    return this.isValid
  }
}
export class AuthenticationSpy implements Authentication {
  authenticationParams: Authentication.Params
  authentiationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.fullName()
  }

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = authenticationParams
    return await Promise.resolve(this.authentiationModel)
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accountModel = mockAccountModel()
  accessToken: string
  role: string
  async load (accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken
    this.role = role
    return await Promise.resolve(this.accountModel)
  }
}
