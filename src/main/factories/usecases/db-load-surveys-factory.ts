import { SurveyMongoRepository } from '@/infra/db/mongodb'
import { LoadSurveys } from '@/domain/usecases'
import { DbLoadSurveys } from '@/data/usecases'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
