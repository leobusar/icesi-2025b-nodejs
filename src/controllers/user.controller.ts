import { Request, Response } from "express";

class UserController {
    public create(req: Request, res: Response){
        let user = `email: ${req.body.email}, password: ${req.body.password}, name: ${req.body.name}`;
        res.send(`Create user ${user}`);
    }

    public getAll(req: Request, res: Response){
        res.send('Get all users');
    }

    public getOne(req: Request, res: Response){
        res.send(`Get user with id ${req.params.id}`);
    }

    public update(req: Request, res: Response){
        res.send(`Change user with id ${req.params.id}`);
    }
    public delete(req: Request, res: Response){
        res.send(`Delete user with id ${req.params.id}`);
    }
}

export const userController = new UserController();