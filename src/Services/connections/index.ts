import {
  createConnection,
  getConnectionOptions,
  getMongoManager,
  MongoEntityManager,
} from "typeorm";

export default class Conn {
  /**
   * @method            createTypeOrmConnection
   * @description       instantiate a new typeOrm connection
   */
  public static async createTypeOrmConnection() {
    /**
     * getConnectionOptions  > Default
     */
    const default_ = await getConnectionOptions("default");

    return createConnection({ ...default_ });
  }

  static manager(): MongoEntityManager {
    return getMongoManager();
  }
}

// NOTE: UPDATE DEFAULT CONNECTION TO BE _user-and-administrative-schema
