import { MongoMemoryServer } from "mongodb-memory-server-core";
import mongoose from "mongoose";

// This will create an new instance of "MongoMemoryServer" and automatically start it

export async function mongoInMemory() {
	const mongod = await MongoMemoryServer.create();

	const DB_URI = mongod.getUri();
	return mongoose
		.connect(DB_URI, { dbName: "test" })
		.then(() => console.log("DB connected"))
		.catch((e) => console.log(`db connection failure`, e));
}

// // The Server can be stopped again with
// await mongod.stop();
