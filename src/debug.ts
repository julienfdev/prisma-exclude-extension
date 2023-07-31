import { PrismaClient } from "@prisma/client";
import { excludePrisma } from "./index.js";

const prisma = new PrismaClient().$extends(excludePrisma);

async function main() {
  const user = await prisma.user.findManyExclude({ exclude: { email: true } });
  if (user.length) {
    console.log(user[0]);
  }
}

main();
