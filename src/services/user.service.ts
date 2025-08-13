import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserInput, UserInputUpdate, UserLogin } from "../interfaces";
import { UserDocument, UserModel } from "../models";

class UserService {
    public async create(userInput: UserInput): Promise<UserDocument>{

        process.loadEnvFile();

        const userExists: UserDocument | null = await this.findByEmail(userInput.email); 
        if (userExists !== null){
            throw new ReferenceError("User already exists"); 
        }
        if(userInput.password){
            // const secret: string = process.env.SECRET || ""; Revisar
            userInput.password = await bcrypt.hash(userInput.password, 10 );
        }
        return UserModel.create(userInput);
    }

    public findByEmail(email: string, password: boolean = false): Promise<UserDocument | null> {
        
        return UserModel.findOne({email},{password});
    }

    public async update(id: string, userInput: UserInputUpdate): Promise<UserDocument | null>{
        try {
            const user: UserDocument | null = await UserModel.findOneAndUpdate(
                {_id: id}, 
                userInput, 
                {returnOriginal: false}
            );
            return user; 
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<UserDocument | null>{
        try {
            const user: UserDocument | null = await UserModel.findOneAndDelete(
                {_id: id}
            );
            return user; 
        } catch (error) {
            throw error;
        }
    }    

    public getAll(): Promise<UserDocument[]> {
        return UserModel.find();
    }

    public getById(id: string): Promise<UserDocument | null>{
        return UserModel.findById(id);
    }

    public async  login(userLogin: UserLogin): Promise< any> {
        const userExists: UserDocument | null = await this.findByEmail(userLogin.email,true);
        if(userExists === null){
            throw new ReferenceError("Not Authorized");
        }
        const isMatch: boolean = await bcrypt.compare(userLogin.password, userExists.password);

        if(!isMatch){
            throw new ReferenceError("Not Authorized");
        }

        return {
            id: userExists.id,
            roles: ["admin"],
            token: await this.generateToken(userExists.id)
        };

    }

    public async generateToken(id: string): Promise<string> {
        const user = await this.getById(id);
        if (user == null)
            throw new Error();
        return jwt.sign(
            user, 
            "secret_key", 
            {expiresIn: "10m"}
        ); 
    }

}

export const userService = new UserService();