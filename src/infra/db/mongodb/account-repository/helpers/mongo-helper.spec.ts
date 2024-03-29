import { MongoHelper as sut } from './mongo-helper'
beforeEach(async () => {
  await sut.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await sut.disconnect()
})
describe.only('Mongo Helper', () => {
  test('should reconnect if mongodb is down ', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
