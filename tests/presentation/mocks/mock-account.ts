import { mockAccountModel } from '@/tests/domain/mocks'
import { AddAccount, AddAccountParams, LoadAccountByToken, Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models/account'
import { faker } from '@faker-js/faker'
import { AuthenticationModel } from '@/domain/models/authentication'

export class AddAccountSpy implements AddAccount {
  account: AddAccountParams
  fakeAccount = mockAccountModel()
  async add (account: AddAccountParams): Promise<AccountModel> {
    this.account = account
    return await Promise.resolve(this.fakeAccount)
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams
  authentiationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
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
