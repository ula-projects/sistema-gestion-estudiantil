import "dotenv/config";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role, UserStatus } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const passwordHash = await bcrypt.hash("Admin123456!", 12);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@universidad.edu",
    },

    update: {
      name: "Administrador Principal",
      institutionalId: "V012345678",
      passwordHash,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,

      adminProfile: {
        upsert: {
          update: {
            employeeCode: "EMP-ADM-0001",
            position: "Administrador del Sistema",
          },
          create: {
            employeeCode: "EMP-ADM-0001",
            position: "Administrador del Sistema",
          },
        },
      },
    },

    create: {
      name: "Administrador Principal",
      email: "admin@universidad.edu",
      institutionalId: "V012345678",
      passwordHash,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,

      adminProfile: {
        create: {
          employeeCode: "EMP-ADM-0001",
          position: "Administrador del Sistema",
        },
      },
    },

    include: {
      adminProfile: true,
    },
  });

  console.log("Usuario administrador creado o actualizado:");
  console.log({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    institutionalId: admin.institutionalId,
    role: admin.role,
    status: admin.status,
    adminProfile: admin.adminProfile,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
