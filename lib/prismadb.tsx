import { PrismaClient } from "@prisma/client";

const client = global.prismadb || new PrismaClient(); // global files are not affected by hot preloading
if (process.env.NODE_ENV !== "production") global.prismadb = client;

export default client;
