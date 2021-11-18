import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
   test('Should return an account on succes ', async () => {
     await request(app)
      .post('/api/signup')
      .send({
        name: 'Dalton',
        email: 'dalton.dias@ymail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
   })
})