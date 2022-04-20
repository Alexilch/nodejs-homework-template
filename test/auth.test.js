const  signup  = require('../controllers/auth/signup')
const jestConfig = require('../jest.config')
const authService = require('../services/auth')

describe('Auth', () => {
  let req, res
  beforeEach(() => {
    req = { body: { email: 'user333@mail.com', password: 'qwerty' } }
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) }
    authService.create = jest.fn((data) => data)
  })
  test('signup new user', async () => {
    result = await signup(req, res)
    expect(authService.create).toHaveBeenCalled()
    expect(authService.create).toHaveBeenCalledWith(req.body)
    expect(result.code).toBe(201)
  })
})