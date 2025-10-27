import { UserInput } from "../interfaces/user.interface.js";
import { UserDocument } from "../models/user.model.js";
import { userService } from "../services/";

export const resolvers = {
    Query : {
        users: async (_root: any) => await userService.getAll(),
        user: async (_root: any, params: any) => {
            const user: UserDocument | null = await userService.getById(params.id);
            return user;
        }
    }, 
    Mutation: {
        createUser: async (_root: any, params: any) => {
            const userOutput: UserDocument =  await userService.create(params.input as UserInput); 

            return userOutput;
        }
    }
}