import { PrismaClient } from "@prisma/client";


require('dotenv').config()
export const prismaClient = new PrismaClient();