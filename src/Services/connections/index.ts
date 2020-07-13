import {
  getConnection,
  createConnection,
  getConnectionOptions,
  getMongoManager,
  MongoEntityManager,
} from "typeorm";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

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
  public static async createTestConn() {
    /**
     * getConnectionOptions  > Test
     */
    const test = await getConnectionOptions("test");

    // tslint:disable-next-line:no-object-literal-type-assertion
    return createConnection({
      ...test,
      name: "default",
      useUnifiedTopology: true,
    } as MongoConnectionOptions); // useUnifiedTopology: true
  }

  static get_conn(conn_name: string) {
    return getConnection(conn_name);
  }
}

// NOTE: UPDATE DEFAULT CONNECTION TO BE _user-and-administrative-schema
