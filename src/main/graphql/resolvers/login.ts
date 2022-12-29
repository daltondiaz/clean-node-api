import { makeLoginController } from '@/main/factories/controllers'
import { adaptResolver } from '@/main/adapters'

export default {
  Query: {
    login: async (parent: any, args: any) => await adaptResolver(makeLoginController(), args)
  }
}