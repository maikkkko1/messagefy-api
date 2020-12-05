import express from "express";
import DeviceController from "../../app/controllers/DeviceController";
import { IRoutes } from "../../app/interfaces/IRoutes";

export default class DeviceRoutes implements IRoutes {
  public routerController = new DeviceController();

  private router = express.Router();

  constructor() {
    this.setPublicRoutes();
  }

  setGuardedRoutes() {}

  setPublicRoutes() {
    this.router.post("/newToken", this.routerController.createDeviceToken.bind(this));
  }

  loadRoutes() {
    return this.router;
  }
}
