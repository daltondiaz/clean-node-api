import app from '../config/app'
import env from '../config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helpers'
import { sign } from 'jsonwebtoken'
import request from 'supertest'
import { Collection } from 'mongodb'

let surveysCollections: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Dalton',
    email: 'dalton@mail.com',
    password: '123'
  })
  const { insertedId: id } = res
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveysCollections = await MongoHelper.getConnection('surveys')
    await surveysCollections.deleteMany({})
    accountCollection = await MongoHelper.getConnection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with accessToken', async () => {
      const accesToken = await makeAccessToken()
      const res = await surveysCollections.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        },
        {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      const { insertedId: id } = res
      await request(app)
        .put(`/api/surveys/${id.toHexString()}/results`)
        .set('x-access-token', accesToken)
        .send({
          answer: 'Answer 1'
        })
        .expect(200)
    })
  })
})
