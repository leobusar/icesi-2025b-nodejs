import {object, string} from 'zod'; 

export const  userSchema: any =  object({
    name: string({error: "Name is required"}),
    email: string({error: "Email is required"})
                .email("Not a valid email address"), 
    password: string({error: "Email is required"})
                .min(8, "Password must be at least 8 characteres long")
});