import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb'
import app from '@/main/config/app'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getConnection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup ', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Dalton',
          email: 'dalton@mail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login ', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Dalton',
        email: 'dalton@mail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'dalton@mail.com',
          password: '123'
        })
        .expect(200)
    })
    test('Should return 401 on login ', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'dalton@mail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
