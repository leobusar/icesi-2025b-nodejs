import { Request, Response } from "express";
import { UserDocument } from "../models";
import { userService } from "../services";
import { UserInput, UserInputUpdate } from "../interfaces";

class UserController {
    public async create(req: Request, res: Response){
        try {
            const newUser: UserDocument = await userService.create(req.body as UserInput); 
            res.status(201).json(newUser);            
        } catch (error) {
            if(error instanceof ReferenceError){
                res.status(400).json({message: "User already exists"}); 
                return;
            }
                
            res.status(500).json(error);            
        }

    }

    public async getAll(req: Request, res: Response){
       try {
            const users: UserDocument[] = await userService.getAll(); 
            res.json(users);
       } catch (error) {
            res.status(500).json(error);        
       }
    }

    public async getOne(req: Request, res: Response){
        try {
            const id: string = req.params.id || "";
            const user: UserDocument | null =  await userService.getById(id); 
            if(user === null){
                res.status(404).json({message: `User with id ${id} not found`});
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }        
    }

    public async  update(req: Request, res: Response){
        try {
            const id: string = req.params.id || "";
            const user: UserDocument | null =  await userService.update(id, req.body as UserInputUpdate); 
            if(user === null){
                res.status(404).json({message: `User with id ${id} not found`});
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    public delete(req: Request, res: Response){
        res.send(`Delete user with id ${req.params.id}`);
    }
}

export const userController = new UserController();