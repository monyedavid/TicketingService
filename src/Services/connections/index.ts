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
     * getConnectionOptions  returns connection options specified in ormconfig.json
     */
    const options = await getConnectionOptions(process.env.NODE_ENV as string);

    return createConnection({ ...options, name: "default" });
  }

  static manager(): MongoEntityManager {
    return getMongoManager();
  }

  /**
   * @method            createTypeOrmTestConnection
   * @description       instantiate a new typeOrm connection
   */
  public static async createTypeOrmTestConnection() {
    /**
     * getConnectionOptions  > Test
     */
    const test = await getConnectionOptions("test");

    return createConnection({ ...test, name: "default" });
  }
}

// NOTE: UPDATE DEFAULT CONNECTION TO BE _user-and-administrative-schema
