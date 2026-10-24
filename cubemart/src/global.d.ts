import { Connection } from "mongoose";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

declare global {
   var mongoose: {
    conn:Connection | null,
    promise:Promise<Connection> | null
   }
    }
export {};