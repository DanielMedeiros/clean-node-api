import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/account-repository/helpers/mongo-helper'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Daniel',
        email: 'daniel@mail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
