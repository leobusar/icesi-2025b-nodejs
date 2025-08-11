import bcrypt from "bcrypt";

import { UserInput, UserInputUpdate } from "../interfaces";
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

    public findByEmail(email: string): Promise<UserDocument | null> {
        return UserModel.findOne({email});
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

    public getAll(): Promise<UserDocument[]> {
        return UserModel.find();
    }

    public getById(id: string): Promise<UserDocument | null>{
        return UserModel.findById(id);
    }


}

export const userService = new UserService();