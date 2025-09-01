import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export const auth = async  (req: Request, res: Response, next:NextFunction) =>  {
    let token: string | undefined = req.header("Authorization");
    
    process.loadEnvFile();

    if (!token){
        res.status(401).json({"message": "Not Authorized"}); 
        return;
    }

    try {
        token = token.replace("Bearer ", "");
        const decoded: any = await jwt.verify(token, process.env.SECRET || "" );
        //req.body.loggedUser = decoded; 
        //console.log("decoded: ", decoded);
        req.params.id = decoded.user.id;
        next();
    } catch (error) {
        console.error(error);
        if(error instanceof TokenExpiredError) {
            res.status(401).json("Token expired");
            return;
        }
        res.status(401).json("Not Authorized");
    }
} 