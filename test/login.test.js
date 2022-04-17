const  login  = require('../controllers/auth/login')
const authService = require('../services/auth')


describe('Login',()=>{
    let req, res
     beforeEach( () => {
         req = { body: {email: 'user333@mail.com', password: 'qwerty'}}
         res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) }
      authService.login = jest.fn((data) => data)
     } )
    test('login user', async () => {
        result = await login(req, res)
        expect(authService.login).toHaveBeenCalled()
        expect(authService.login).toHaveBeenCalledWith(req.body)
        expect(result.code).toBe(200)
        expect.stringContaining(result.data.email)
        expect.stringContaining(result.data.password)
        console.log(result);
      })
})

