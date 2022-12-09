import { LoadSurveyResult } from '@/domain/usecases'
import { CheckSurveyById } from '@/domain/usecases/check-survey-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { forbideen, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: CheckSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult) {
  }

  async handle (request: LoadSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId } = request
      console.log(surveyId)
      const exists = await this.loadSurveyById.checkById(surveyId)
      if (!exists) {
        return forbideen(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, request.accountId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadSurveyResultController {
  export type Request = {
    surveyId: string
    accountId: string
  }
}
