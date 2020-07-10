import { v4 } from "uuid";
import { Redis } from "ioredis";
import { forgotPasswordPrefix } from "./constants";

export const createForgotPasswordLink = async (
    url: string,
    user_id: string | number,
    redis: Redis
) => {
    const id = v4();
    await redis.set(
        `${forgotPasswordPrefix}${id}`,
        user_id,
        "ex",
        60 * 60 * 20
    );
    return `${url}/change-password/${id}`;
};
