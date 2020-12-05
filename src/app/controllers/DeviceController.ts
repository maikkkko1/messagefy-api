import { IController } from "../interfaces/IController";
import DeviceService from "../services/DeviceService";
import MainController from "./MainController";
const { v4: uuidv4 } = require("uuid");

class DeviceController extends MainController implements IController {
  constructor() {
    super();
  }

  public controllerService: DeviceService = new DeviceService();

  public createDeviceToken = async (req: any, res: any) => {
    try {
      const token = uuidv4();

      await this.controllerService.createDeviceToken({ token: token });

      this.responseSuccess(res, token);
    } catch (err) {
      this.logError("SendNotification", err);

      this.responseServerError(res);
    }
  };
}

export default DeviceController;
