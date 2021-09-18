const request = require('supertest')

import app from '../../src/app'

describe('Genral route', () => {
  it('Return Hello World', async () => {
    const response = await request(app.callback()).get('/')

    expect(response.status).toEqual(200)
    expect(response.text).toEqual('Hello World!')
  })
})