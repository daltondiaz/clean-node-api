import { CheckSurveyById } from '@/domain/usecases'
import { CheckSurveyByIdRepository } from '../protocols'

export class DbCheckSurveyById implements CheckSurveyById {
  constructor (private readonly checkSurveyByIdReposinory: CheckSurveyByIdRepository) {}

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    return await this.checkSurveyByIdReposinory.checkById(id)
  }
}
