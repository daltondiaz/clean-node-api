import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveys {
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  load(): Promise<SurveyModel[]>
}
