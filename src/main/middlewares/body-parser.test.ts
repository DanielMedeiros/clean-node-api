import request from 'supertest'
import app from '../config/app'

describe('Body Parse Middleware', () => {
  test('Should parse body as jason', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Daniel' })
      .expect({ name: 'Daniel' })
  })
})
