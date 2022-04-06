export const surveyResultAnswerSchema = {
  type: 'object',
  properties: {
    question: {
      type: 'string'
    },
    surveyId: {
      type: 'string'
    },
    date: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyResultAnswer'
      }
    }
  },
  required: ['surveyId', 'question', 'answer', 'date']
}
