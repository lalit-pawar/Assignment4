const { v4: uuidv4 } = require("uuid");

class BaseEntity {
  constructor() {
    this.id = null;
    this.uId = null;
    this.dType = null;
    this.tenantUId = null;
    this.createdBy = null;
    this.createdByName = null;
    this.createdOn = null;
    this.updatedBy = null;
    this.updatedByName = null;
    this.updatedOn = null;
    this.version = 0;
    this.active = true;
    this.archived = false;
    this.customFields = [];
  }
  
  initialize(isNew, dType, createdOrUpdatedBy, createdOrUpdatedByName) {
    this.dType = dType;
    this.id = uuidv4();
    this.active = true;
    this.archived = false;
    
    if (isNew) {
      // Adding new record
      this.uId = this.id;
      this.createdBy = createdOrUpdatedBy;
      this.createdByName = createdOrUpdatedByName;
      this.createdOn = new Date().toISOString();
      this.version = 1;
      this.updatedBy = createdOrUpdatedBy;
      this.updatedByName = createdOrUpdatedByName;
      this.updatedOn = this.createdOn;
    } else {
      // Updating record
      this.updatedBy = createdOrUpdatedBy;
      this.updatedByName = createdOrUpdatedByName;
      this.updatedOn = new Date().toISOString();
      this.version++;
    }
  }
}


module.exports = BaseEntity;

