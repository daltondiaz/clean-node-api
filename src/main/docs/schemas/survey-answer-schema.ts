export const surveyAnswerSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    question: {
      type: 'string'
    },
    date: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: '#/schemas/survey-answer'
    }
  }
}
