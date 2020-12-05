const config = require("../config/database");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config);

exports.model = (model) => {
  return new Db(model);
};

class Db {
  constructor(model) {
    this.model = model;
  }

  async select(where = false, fields = false, orderBy = [], limitQuery) {
    const queryObj = {
      raw: true,
      attributes: fields,
      order: orderBy,
      limit: limitQuery,
    };

    if (where) {
      queryObj.where = where;

      return await this.model.findOne(queryObj);
    }

    return await this.model.findAll(queryObj);
  }

  async selectAllWhere(where = false, fields = false, orderBy = [], limitQuery) {
    const queryObj = {
      raw: true,
      attributes: fields,
      order: orderBy,
      limit: limitQuery,
      where: where,
    };

    return await this.model.findAll(queryObj);
  }

  async update(where, data) {
    if (!where || !data) return false;

    return await this.model.update(data, { where: where });
  }

  async delete(where) {
    if (!where) return false;

    return await this.model.destroy({ where });
  }

  async insert(data) {
    if (!data) return false;

    const v = await this.model.create(data);

    return v.get({ plain: true });
  }

  async query(q) {
    const results = await sequelize.query(q);

    return results[0];
  }
}
