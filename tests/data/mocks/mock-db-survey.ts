import { AddSurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols/'
import { SurveyModel } from '@/domain/models'
import { mockSurveyModel, mockSurveyModels } from '@/tests/domain/mocks'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyRepositoryParams: AddSurveyRepository.Params
  async add (data: AddSurveyRepository.Params): Promise<void> {
    this.addSurveyRepositoryParams = data
    return await Promise.resolve()
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  surveyModel = mockSurveyModel()
  id: string
  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return await Promise.resolve(this.surveyModel)
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  surveyModels = mockSurveyModels()
  accountId: String
  async loadAll (accountId: String): Promise<SurveyModel[]> {
    this.accountId = accountId
    return await Promise.resolve(this.surveyModels)
  }
}
