import { DeviceType } from "../types/DeviceType";

const { device } = require("../models");
const db = require("../../database/Db");

export default class DeviceService {
  createDeviceToken = async (data: DeviceType) => {
    return await db.model(device).insert(data);
  };

  findByToken = async (token: string) => {
    return await db.model(device).select({ token: token });
  };
}
