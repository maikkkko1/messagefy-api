const { Op } = require("sequelize");

export default class DbFilters {
  /**
   * @param initialDate - Initial data ISO format, ex: 2020-10-10
   * @param finalDate - Final data ISO format, ex: 2020-10-11
   */
  getWhereDateRangeObj = (initialDate: string, finalDate: string) => {
    const startDate = initialDate + "T00:00:00.000Z";
    const endDate = finalDate + "T23:59:59.000Z";

    if (initialDate && finalDate) {
      return { createdAt: { [Op.between]: [startDate, endDate] } };
    }

    if (initialDate) {
      return { createdAt: { [Op.gte]: startDate } };
    }

    if (finalDate) {
      return { createdAt: { [Op.lte]: endDate } };
    }

    return {};
  };
}
