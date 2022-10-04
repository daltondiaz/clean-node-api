import { MongoHelper } from '@/infra/db/mongodb'
import { LogErrorRepository } from '@/data/protocols'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getConnection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
