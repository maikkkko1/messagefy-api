export default class Util {
  static formatDbDateTime = (value: string) => {
    const date = new Date(value).toLocaleString();

    return date.substring(0, date.length - 3);
  };
}
