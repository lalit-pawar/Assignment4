const BaseEntity = require("../common/baseEntity");

class Rocket extends BaseEntity {
  constructor({
    wikipedia =null,
    description = null,
    rocket_id = null,
    rocket_name = null,
    rocket_type = null,
  } = {}) {
    super();
    this.wikipedia = wikipedia;
    this.description = description;
    this.rocket_id = rocket_id;
    this.rocket_name = rocket_name;
    this.rocket_type = rocket_type;
  }
}

module.exports = Rocket;
