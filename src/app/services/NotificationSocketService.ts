import { NotificationType } from "./../types/NotificationType";
import SocketEvents from "../constants/SocketEvents";
import DeviceService from "./DeviceService";
import NotificationService from "./NotificationService";

const { v4: uuidv4 } = require("uuid");

export default class NotificationSocketService {
  private static instance: NotificationSocketService;
  private static socketServer: SocketIO.Server;

  constructor() {
    if (NotificationSocketService.instance) {
      return NotificationSocketService.instance;
    }

    NotificationSocketService.instance = this;
  }

  static setSocketServer(server: SocketIO.Server) {
    this.socketServer = server;
  }

  static initializeSocketListeners() {
    const notificationService = new NotificationService();
    const deviceService = new DeviceService();

    this.socketServer.on("connection", (socket) => {
      console.log("New connection");

      this.onSubscribeDeviceToRoom(socket);

      this.onNewDeviceTokenRequested(socket, deviceService);

      this.onConfirmReceivedRequested(socket, notificationService);

      socket.on("disconnect", () => {
        return null;
      });
    });
  }

  static onNewDeviceTokenRequested(socket: any, deviceService: DeviceService) {
    socket.on(SocketEvents.REQUEST.NEW_TOKEN, async () => {
      socket.join(socket.client.id);

      const getNewToken = await deviceService.createDeviceToken({ token: uuidv4() });

      this.emitEventInRoom(
        SocketEvents.NEW.DEVICE_TOKEN,
        { deviceToken: getNewToken.token },
        socket.client.id
      );
    });
  }

  static onConfirmReceivedRequested(
    socket: any,
    notificationService: NotificationService
  ) {
    socket.on(SocketEvents.REQUEST.CONFIRM_RECEIVED, async (notificationId: string) => {
      await notificationService.setReceived(notificationId);
    });
  }

  /** Subscribe the device in a room. */
  static onSubscribeDeviceToRoom(socket: any) {
    socket.on(SocketEvents.JOIN.NOTIFICATIONS, (deviceToken: string) => {
      socket.join(deviceToken);
    });
  }

  static sendNewNotificationToRoom(deviceToken: string, notification: NotificationType) {
    this.emitEventInRoom(SocketEvents.NEW.NOTIFICATION, notification, deviceToken);
  }

  static sendNewNotificationToAll(notification: NotificationType) {
    this.emitEvent(SocketEvents.NEW.NOTIFICATION, notification);
  }

  static emitEventInRoom(event: string, data: any, room: string) {
    this.socketServer.in(room).emit(event, data);
  }

  static emitEvent(event: string, data: any) {
    this.socketServer.emit(event, data);
  }
}
