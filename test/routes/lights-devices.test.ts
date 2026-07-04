import { request } from '../setup'

describe('Lights Switches', () => {
  describe('When GET /lights-switches', async () => {
    const path = '/lights-devices'

    it('Then lights switches page is returned', async () => {
      const response = await request.get(path)
      expect(response.status).toBe(200)
      expect(response.type).toEqual('text/html')
    })
  })
})
