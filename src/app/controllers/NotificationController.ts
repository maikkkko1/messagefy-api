import { IController } from "../interfaces/IController";
import DeviceService from "../services/DeviceService";
import NotificationService from "../services/NotificationService";
import NotificationSocketService from "../services/NotificationSocketService";
import MainController from "./MainController";

class NotificationController extends MainController implements IController {
  constructor() {
    super();
  }

  public controllerService: NotificationService = new NotificationService();

  private deviceService = new DeviceService();

  public sendNotificationTo = async (req: any, res: any) => {
    const body = req.body;

    const tokenList: string[] = body.tokens ?? [];

    if (tokenList.length < 1) {
      return this.responseError(res, 400, "Invalid tokens list.");
    }

    if (!body.title) {
      return this.responseInvalidData(res);
    }

    for (let i = 0; i < tokenList.length; i++) {
      const findDeviceToken = await this.deviceService.findByToken(tokenList[i]);

      if (!findDeviceToken) {
        return this.responseError(res, 404, `Token ${tokenList[i]} not found.`);
      }
    }

    try {
      const notification = await this.controllerService.createNotification(body);

      for (let j = 0; j < tokenList.length; j++) {
        NotificationSocketService.sendNewNotificationToRoom(tokenList[j], notification);
      }

      this.responseSuccess(res, true);
    } catch (err) {
      this.logError("SendNotification", err);

      this.responseServerError(res);
    }
  };
}

export default NotificationController;
