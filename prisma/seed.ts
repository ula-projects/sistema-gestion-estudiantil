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

async function seedFacultyStructure() {
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

  const engineeringFaculty = await prisma.faculty.upsert({
    where: {
      code: "FING",
    },
    update: {
      name: "Facultad de Ingeniería",
      description:
        "Facultad encargada de la formación académica en áreas de ingeniería, ciencias aplicadas, tecnología e infraestructura técnica.",
    },
    create: {
      code: "FING",
      name: "Facultad de Ingeniería",
      description:
        "Facultad encargada de la formación académica en áreas de ingeniería, ciencias aplicadas, tecnología e infraestructura técnica.",
    },
  });

  const schools = [
    {
      code: "EBAS",
      name: "Escuela Básica",
      description:
        "Escuela encargada de las asignaturas básicas y comunes de las carreras de ingeniería.",
    },
    {
      code: "ESIS",
      name: "Escuela de Ingeniería de Sistemas",
      description:
        "Escuela encargada de la carrera de Ingeniería de Sistemas y sus menciones.",
    },
    {
      code: "EMEC",
      name: "Escuela de Ingeniería Mecánica",
      description: "Escuela encargada de la carrera de Ingeniería Mecánica.",
    },
    {
      code: "ECIV",
      name: "Escuela de Ingeniería Civil",
      description: "Escuela encargada de la carrera de Ingeniería Civil.",
    },
  ];

  for (const school of schools) {
    await prisma.school.upsert({
      where: {
        facultyId_code: {
          facultyId: engineeringFaculty.id,
          code: school.code,
        },
      },
      update: {
        name: school.name,
        description: school.description,
      },
      create: {
        facultyId: engineeringFaculty.id,
        code: school.code,
        name: school.name,
        description: school.description,
      },
    });
  }

  const departments = [
    {
      code: "DMAT",
      name: "Departamento de Matemáticas",
      description:
        "Departamento responsable de asignaturas como Cálculo, Álgebra, Matemáticas Discretas y Estadística.",
    },
    {
      code: "DFIS",
      name: "Departamento de Física",
      description:
        "Departamento responsable de asignaturas relacionadas con física, mecánica, electricidad y laboratorios físicos.",
    },
    {
      code: "DSIS",
      name: "Departamento de Sistemas Computacionales",
      description:
        "Departamento responsable de asignaturas como Programación, Algoritmos, Bases de Datos, Redes y Sistemas Operativos.",
    },
    {
      code: "DHUM",
      name: "Departamento de Ciencias Humanísticas",
      description:
        "Departamento responsable de asignaturas humanísticas, comunicación, ética, metodología e investigación.",
    },
    {
      code: "DMEC",
      name: "Departamento de Ingeniería Mecánica",
      description:
        "Departamento responsable de asignaturas especializadas de Ingeniería Mecánica.",
    },
    {
      code: "DCIV",
      name: "Departamento de Ingeniería Civil",
      description:
        "Departamento responsable de asignaturas especializadas de Ingeniería Civil.",
    },
  ];

  for (const department of departments) {
    await prisma.department.upsert({
      where: {
        facultyId_code: {
          facultyId: engineeringFaculty.id,
          code: department.code,
        },
      },
      update: {
        name: department.name,
        description: department.description,
      },
      create: {
        facultyId: engineeringFaculty.id,
        code: department.code,
        name: department.name,
        description: department.description,
      },
    });
  }

  console.log("Estructura académica creada correctamente:");
  console.log({
    faculty: engineeringFaculty.name,
    schools: schools.map((school) => school.name),
    departments: departments.map((department) => department.name),
  });
}

async function main() {
  await seedFacultyStructure();
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
