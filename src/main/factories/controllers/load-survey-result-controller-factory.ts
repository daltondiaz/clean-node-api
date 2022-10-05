import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveyById, makeDbLoadSurveyResult } from '@/main/factories/usecases'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
