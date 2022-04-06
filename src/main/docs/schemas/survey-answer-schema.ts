export const surveyAnswerSchema = {
  type: 'object',
  properties: {
    imagem: {
      type: 'string'
    },
    answer: {
      type: 'string'
    },
    count: {
      type: 'number'
    },
    percent: {
      type: 'number'
    }
  },
  required: ['answer', 'count', 'percent']
}
