// Test GQL Modules
import * as rp from "request-promise";
import { Connection } from "typeorm";

import Conn from "../../Services/connections";

let connection: Connection;

export class Tc {
  static async conn() {
    await Conn.createTestConn();
    connection = Conn.get_conn("default");
  }
  static async close() {
    await connection.close();
  }
  url: string;
  options: {
    jar: any;
    withCredentials: boolean;
    json: boolean;
  };
  constructor(url: string) {
    this.url = url;
    this.options = {
      withCredentials: true,
      json: true,
      jar: rp.jar(),
    };
  }
}
