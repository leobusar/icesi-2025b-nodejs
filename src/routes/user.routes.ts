import express, {Request, Response} from "express";
import { userController } from "../controllers";
import { auth } from "../middlewares/auth.middleware";

export const router = express.Router();

router.get("/", auth, userController.getAll); 

router.get("/profile", auth, userController.getOne);

router.get("/:id", userController.getOne); 

router.put("/:id", userController.update); 

router.delete("/:id", userController.delete); 

router.post("/", userController.create);

router.post("/login", userController.login);
