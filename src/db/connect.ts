import mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server-core";

export async function connect(): Promise<void> {
	const mongod = await MongoMemoryServer.create();

	const DB_URI = mongod.getUri();
	return mongoose
		.connect(DB_URI, { dbName: "testDB" })
		.then(() => console.log("DB connected"))
		.catch((e) => console.log(`db connection failure`, e));
}
