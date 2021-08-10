import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

// Settings
routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.show);
routes.put("/settings/:username", settingsController.update);

// Users
routes.post("/users", usersController.create);

// Messages
routes.post("/messages", messagesController.create);
routes.get("/messages/:user_id", messagesController.show);

export { routes };
