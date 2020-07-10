import * as bp from "body-parser";
import { default as cors } from "cors";
import { default as express } from "express";
import { default as helmet } from "helmet";
// import { v4 } from "uuid";
import Authentication from "./Controllers/v1/auth";

import { notFound, errorHandler } from "./Middlewares/miscellanous";

const app = express.Router();

app.use(helmet());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(
    cors({
        credentials: true,
        origin: /.*/,
    })
);

app.get("/", (_, res) => {
    res.json({
        message: "API Version 1 - 👋🌎🌍🌏",
    });
});

// Authentication activities
app.use(Authentication);

app.use(notFound);
app.use(errorHandler);

export default app;
