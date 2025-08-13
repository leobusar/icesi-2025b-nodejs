import express, {Request, Response} from "express";
import { userController } from "../controllers";

export const router = express.Router();

router.get("/", userController.getAll); 

router.get("/:id", userController.getOne); 

router.put("/:id", userController.update); 

router.delete("/:id", userController.delete); 

router.post("/", userController.create);

router.post("/login", userController.login);