import { AddSurvey, LoadAnswersBySurvey, LoadSurveys } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModels } from '@/tests/domain/mocks'
import { CheckSurveyById } from '@/domain/usecases/check-survey-by-id'
import { faker } from '@faker-js/faker'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurvey.Params
  async add (addSurveyParams: AddSurvey.Params): Promise<void> {
    this.addSurveyParams = addSurveyParams
    return await Promise.resolve()
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels = mockSurveyModels()
  accountId: string
  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return await Promise.resolve(this.surveyModels)
  }
}

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
  surveyId: string
  result = [faker.random.words(), faker.random.words()]
  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    this.surveyId = id
    return this.result
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  surveyId: string
  result = true
  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.surveyId = id
    return this.result
  }
}
