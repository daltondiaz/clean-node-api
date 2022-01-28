export interface AddSurveyModel {
  question: string
  answers: SurveyAnswer[]
  date: Date
}

export interface SurveyAnswer {
  image?: string
  answer: string
}

export interface AddSurvey {
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  add(data: AddSurveyModel): Promise<void>
}
