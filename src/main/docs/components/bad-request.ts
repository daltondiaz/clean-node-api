export const badRequest = {
  description: 'Requesição inválida',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
