import { Redis } from "ioredis";
import Connections_ from "../../connections";

export default class Base {
  /**
   * @constructor    Establish server url ༼ つ ◕_◕ ༽つ
   * @param url      {string} server instance location
   * @param redis
   */
  constructor(url?: string, redis?: Redis) {
    this.url = url;
    this.redis = redis;
  }

  url: string;
  redis: Redis;
}
