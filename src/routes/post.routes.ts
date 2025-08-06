import express, {Request, Response} from "express"; 

export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send('Get all users');
}); 

router.get("/:id", (req: Request, res: Response) => {
    res.send(`Get user with id ${req.params.id}`);
}); 

router.put("/:id", (req: Request, res: Response) => {
    res.send(`Change user with id ${req.params.id}`);
}); 

router.delete("/:id", (req: Request, res: Response) => {
    res.send(`Delete user with id ${req.params.id}`);
}); 

router.post("/", (req: Request, res: Response) => {
    //console.dir(req);
    let user = `email: ${req.body.email}, password: ${req.body.password}, name: ${req.body.name}`;
    res.send(`Create user ${user}`);
}); 