import express from "express";
import DeviceRoutes from "./features/DeviceRoutes";
import NotificationRoutes from "./features/NotificationRoutes";

export default class RoutesV1EntryPoint {
  private router = express.Router();

  constructor() {
    this.setEntryPointRoutes();
  }

  setEntryPointRoutes() {
    this.router.use("/notification", new NotificationRoutes().loadRoutes());
    this.router.use("/device", new DeviceRoutes().loadRoutes());
  }

  loadRoutes() {
    return this.router;
  }
}
