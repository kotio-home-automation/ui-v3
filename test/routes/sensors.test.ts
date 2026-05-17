import { request } from '../setup'

describe('Sensors', () => {
  describe('When GET /sensors', async () => {
    const path = '/sensors'

    it('Then sensors page is returned', async () => {
      const response = await request.get(path)
      expect(response.status).toBe(200)
      expect(response.type).toEqual('text/html')
    })
  })
})

