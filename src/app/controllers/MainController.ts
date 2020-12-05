import Logger from "../commons/Logger";
import apiResponse from "../commons/ApiResponse";

export default class MainController {
  protected responseError = (res: any, httpCode: number, errorMessage: any) => {
    res.status(httpCode).send(apiResponse(errorMessage, true));
  };

  protected responseSuccess = (res: any, data: any) => {
    res.status(200).send(apiResponse(data));
  };

  protected responseInvalidData = (res: any) => {
    res.status(400).send(apiResponse("Invalid data!", true));
  };

  protected responseServerError = (res: any) => {
    res.status(500).send(apiResponse("Internal server error!", true));
  };

  protected logError = (method: string, msg: string) => {
    Logger.logError(method, msg);
  };
}
