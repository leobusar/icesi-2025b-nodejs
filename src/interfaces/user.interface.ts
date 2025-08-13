export interface UserInput {
    name: string, 
    email: string, 
    password: string
}

export interface UserInputUpdate {
    name: string, 
    email: string
}

export interface UserLogin {
    email: string, 
    password: string
}