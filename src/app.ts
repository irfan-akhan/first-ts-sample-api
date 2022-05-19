import express, { json, urlencoded } from "express";
import config from "config";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import { connect } from "./db/connect";
import { notSupported } from "./middleware/notSupported";

const PORT: number = config.get("port");
const HOST: string = config.get("host");

const APP = express();

// app level middleware
APP.use(json());
APP.use(urlencoded({ extended: false }));
APP.use("/api/users", notSupported, userRouter);
APP.use("/api/auth", notSupported, authRouter);

APP.listen(PORT, () => {
	console.log(`server is listening on http://${HOST}:${PORT}`);
	connect();
});
