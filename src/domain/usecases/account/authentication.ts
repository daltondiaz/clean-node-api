import { AuthenticationModel } from '@/domain/models/account'

export type AuthenticationParams = {
  email: string
  password: string
}

export type Authentication = {
  auth: (authentication: AuthenticationParams) => Promise<AuthenticationModel>
}
