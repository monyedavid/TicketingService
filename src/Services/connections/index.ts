import {
  createConnection,
  createConnections,
  getConnectionOptions,
} from "typeorm";

export default class Connections_ {
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
}

// NOTE: UPDATE DEFAULT CONNECTION TO BE _user-and-administrative-schema
