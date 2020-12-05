import { NotificationType } from "../types/NotificationType";

const { notification } = require("../models");
const db = require("../../database/Db");

export default class NotificationService {
  createNotification = async (data: NotificationType) => {
    return await db.model(notification).insert(data);
  };

  setReceived = async (id: string) => {
    return await db.model(notification).update({ id: id }, { received: true });
  };
}
