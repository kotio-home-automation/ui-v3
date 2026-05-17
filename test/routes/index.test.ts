import { request } from '../setup'

describe('Index', () => {
  describe('When GET /', async () => {
    const path = '/'

    it('Then home page is returned', async () => {
      const response = await request.get(path)
      expect(response.status).toBe(200)
      expect(response.type).toEqual('text/html')
    })
  })
})

