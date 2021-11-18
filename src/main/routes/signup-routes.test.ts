import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getConnection('accounts')
    await accountCollection.deleteMany({})
  })

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