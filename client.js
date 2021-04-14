import { PrismaClient } from ".prisma/client";;
import client from "./client";

const client = new PrismaClient();

export default client;
