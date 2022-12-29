import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb'
import { hash } from 'bcrypt'
import { Express } from 'express'
import { setupApp } from '@/main/config/app'

let accountCollection: Collection
let app: Express

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    app = await setupApp()
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
