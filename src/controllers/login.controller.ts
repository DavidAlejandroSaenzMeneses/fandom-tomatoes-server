import { Request, Response } from 'express';

class LoginController{
    validate(req: Request, res: Response){
        const {user,password} = req.body;
        if (user == '' || password == '') {
            return res.status(400).send({
                status: 'error',
                message: 'invalid credentials'
            });
        }
        if (user=='admin' && password=='123') {
            return res.status(200).send({
                status: 'success',
                message: 'Login successful'
            });
        }
    }
}

export const login = new LoginController();