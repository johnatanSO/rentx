import request from 'supertest'
import { app } from '../../../../../shared/infra/http/app'

describe('Create category controller', () => {
  it('should be able list categories', async () => {
    await request(app).get('/categories/').expect(200)
  })
})
