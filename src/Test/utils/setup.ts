import { startServer } from "../../index.start-server";

export const setup = async () => {
    const app = await startServer();
    const addressInfo: any = await app.address();
    process.env.TEST_HOST = `http://127.0.0.1:${addressInfo.port}`;
};
