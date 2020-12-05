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

    try {
      const errors: string[] = [];

      for (let i = 0; i < tokenList.length; i++) {
        const device = await this.deviceService.findByToken(tokenList[i]);

        if (!device) {
          errors.push(`Token ${tokenList[i]} not found.`);
        } else {
          const notification = await this.controllerService.createNotification({
            ...body,
            ...{ deviceId: device.id, deviceToken: device.token },
          });

          NotificationSocketService.sendNewNotificationToRoom(device.token, notification);
        }
      }

      this.responseSuccess(res, { sent: true, errors: errors });
    } catch (err) {
      this.logError("SendNotification", err);

      this.responseServerError(res);
    }
  };
}

export default NotificationController;
