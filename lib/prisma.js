import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    adapter: require("@prisma/adapter-mongodb")?.MongoDBAdapter,
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      adapter: require("@prisma/adapter-mongodb")?.MongoDBAdapter,
    });
  }
  prisma = global.prisma;
}

export default prisma;