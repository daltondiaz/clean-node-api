import { mockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { AccountModel } from '@/domain/models/account'
import { Authentication, AuthenticationParams } from '@/presentation/controllers/login/login/login-controller-protocols'
import { faker } from '@faker-js/faker'

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
  token = faker.datatype.uuid()
  async auth (authenticationParams: AuthenticationParams): Promise<string> {
    this.authenticationParams = authenticationParams
    return await Promise.resolve(this.token)
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
