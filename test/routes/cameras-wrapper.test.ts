import { request } from '../setup'

describe('GET /cameras-wrapper', () => {
  it('should render the cameras-wrapper view with the correct container', async () => {
    const response = await request.get('/cameras-wrapper')
    expect(response.status).toBe(200)
    expect(response.text).toContain('id="cameras-container"')
    expect(response.text).toContain('hx-get="/cameras"')
  })
})
