import { NotificationType } from "../types/NotificationType";

const { notification } = require("../models");
const db = require("../../database/Db");

export default class NotificationService {
  createNotification = async (data: NotificationType) => {
    return await db.model(notification).insert(data);
  };

  setReceived = async (id: number) => {
    return await db.model(notification).update({ id: id }, { received: true });
  };

  getUnreceived = async (deviceToken: string) => {
    return await db
      .model(notification)
      .selectAllWhere({ deviceToken: deviceToken, received: false });
  };
}
