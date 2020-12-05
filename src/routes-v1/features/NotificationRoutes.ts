import express from "express";
import NotificationController from "../../app/controllers/NotificationController";
import { IRoutes } from "../../app/interfaces/IRoutes";

export default class NotificationRoutes implements IRoutes {
  public routerController = new NotificationController();

  private router = express.Router();

  constructor() {
    this.setPublicRoutes();
  }

  setGuardedRoutes() {}

  setPublicRoutes() {
    this.router.post("/sendTo", this.routerController.sendNotificationTo.bind(this));
  }

  loadRoutes() {
    return this.router;
  }
}
