import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveysRepository {
  loadAll: (accountId: String) => Promise<SurveyModel[]>
}
