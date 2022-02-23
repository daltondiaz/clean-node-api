import { SurveyAnswerModel } from '@/domain/models/survey'

export interface AddSurveyModel {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}
export interface AddSurvey {
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  add(data: AddSurveyModel): Promise<void>
}
