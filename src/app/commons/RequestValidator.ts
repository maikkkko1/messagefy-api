export default class RequestValidator {
  static isValidRequest = (request: any, fields: string[]) => {
    for (let i = 0; i < fields.length; i++) {
      if (!request[fields[i]]) {
        return false;
      }
    }

    return true;
  };
}
