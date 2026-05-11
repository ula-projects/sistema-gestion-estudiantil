import "dotenv/config";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  Role,
  UserStatus,
  CurriculumStatus,
  RequirementType,
} from "../src/generated/prisma/client";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL or DATABASE_URL is not defined");
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
      code: "DCTL",
      name: "Departamento de Control",
      description:
        "Departamento responsable de asignaturas de control, instrumentación y automatización.",
    },
    {
      code: "DIOR",
      name: "Departamento de Investigación de Operaciones",
      description:
        "Departamento responsable de asignaturas de investigación de operaciones, modelado y simulación y optimización.",
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

async function seedSystemsEngineering() {
  type SubjectSeed = {
    code: string;
    name: string;
    credits: number;
    departmentCode: string;
    requirementType: RequirementType;
    semesterNumber: number;
  };

  type PrerequisiteSeed = {
    subjectCode: string;
    prerequisiteCodes: string[];
  };

  // Facultad: Ingeniería (FING)
  const faculty = await prisma.faculty.findUnique({ where: { code: "FING" } });

  if (!faculty) {
    throw new Error("Facultad FING no encontrada");
  }

  // Escuela: ESIS
  const school = await prisma.school.findFirst({
    where: { facultyId: faculty.id, code: "ESIS" },
  });

  if (!school) {
    throw new Error("Escuela ESIS no encontrada");
  }

  // Crear carrera Ingeniería de Sistemas
  const career = await prisma.career.upsert({
    where: { schoolId_code: { schoolId: school.id, code: "INGSIS" } },
    update: {
      name: "Ingeniería de Sistemas",
      description: "Carrera de Ingeniería de Sistemas",
    },
    create: {
      schoolId: school.id,
      code: "INGSIS",
      name: "Ingeniería de Sistemas",
      description: "Carrera de Ingeniería de Sistemas",
    },
  });

  // Opción / mención por defecto
  const option = await prisma.careerOption.upsert({
    where: { careerId_code: { careerId: career.id, code: "GEN" } },
    update: { name: "General" },
    create: { careerId: career.id, code: "GEN", name: "General" },
  });

  // Pensum (curriculum) versión 1
  const curriculum = await prisma.curriculum.upsert({
    where: { careerOptionId_version: { careerOptionId: option.id, version: 1 } },
    update: { name: "Pensum Ingeniería de Sistemas", status: CurriculumStatus.ACTIVE },
    create: {
      careerOptionId: option.id,
      code: "PENSUM-1",
      name: "Pensum Ingeniería de Sistemas",
      version: 1,
      status: CurriculumStatus.ACTIVE,
    },
  });

  // Materias del pensum (código, nombre, créditos, departamento, semestre y tipo)
  const subjects: SubjectSeed[] = [
    { code: "1004", name: "Cálculo 10", credits: 6, departmentCode: "DMAT", requirementType: RequirementType.REQUIRED, semesterNumber: 1 },
    { code: "1006", name: "Sistemas de Representación 10", credits: 4, departmentCode: "DHUM", requirementType: RequirementType.REQUIRED, semesterNumber: 1 },
    { code: "1035", name: "Métodos y Técnicas de Investigación", credits: 3, departmentCode: "DHUM", requirementType: RequirementType.ELECTIVE, semesterNumber: 1 },
    { code: "1053", name: "Ingeniería de Sistemas", credits: 4, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 1 },
    { code: "1054", name: "Programación 1", credits: 4, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 1 },
    { code: "1011", name: "Física 11", credits: 5, departmentCode: "DFIS", requirementType: RequirementType.REQUIRED, semesterNumber: 2 },
    { code: "1012", name: "Cálculo 20", credits: 6, departmentCode: "DMAT", requirementType: RequirementType.REQUIRED, semesterNumber: 2 },
    { code: "1055", name: "Programación 2", credits: 4, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 2 },
    { code: "1056", name: "Introducción a los Procesos Químicos", credits: 5, departmentCode: "DHUM", requirementType: RequirementType.REQUIRED, semesterNumber: 2 },
    { code: "1009", name: "Inglés-Lectura I", credits: 3, departmentCode: "DHUM", requirementType: RequirementType.REQUIRED, semesterNumber: 3 },
    { code: "1017", name: "Física 21", credits: 5, departmentCode: "DFIS", requirementType: RequirementType.REQUIRED, semesterNumber: 3 },
    { code: "1018", name: "Cálculo 30", credits: 6, departmentCode: "DMAT", requirementType: RequirementType.REQUIRED, semesterNumber: 3 },
    { code: "1052", name: "Mecánica Racional", credits: 4, departmentCode: "DFIS", requirementType: RequirementType.REQUIRED, semesterNumber: 3 },
    { code: "1057", name: "Arquitectura de Computadoras", credits: 4, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 3 },
    { code: "1020", name: "Laboratorio de Física General", credits: 2, departmentCode: "DFIS", requirementType: RequirementType.REQUIRED, semesterNumber: 4 },
    { code: "1038", name: "Cálculo 40", credits: 6, departmentCode: "DMAT", requirementType: RequirementType.REQUIRED, semesterNumber: 4 },
    { code: "1058", name: "Estocástica 1", credits: 4, departmentCode: "DMAT", requirementType: RequirementType.REQUIRED, semesterNumber: 4 },
    { code: "1059", name: "Elementos de Economía", credits: 4, departmentCode: "DHUM", requirementType: RequirementType.REQUIRED, semesterNumber: 4 },
    { code: "1060", name: "Programación 3", credits: 4, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 4 },
    { code: "7003", name: "Matemáticas Especiales", credits: 5, departmentCode: "DMAT", requirementType: RequirementType.REQUIRED, semesterNumber: 5 },
    { code: "7041", name: "Modelado de Sistemas Físicos", credits: 4, departmentCode: "DFIS", requirementType: RequirementType.REQUIRED, semesterNumber: 5 },
    { code: "7200", name: "Matemáticas Discretas", credits: 4, departmentCode: "DMAT", requirementType: RequirementType.REQUIRED, semesterNumber: 5 },
    { code: "7201", name: "Investigación de Operaciones 1", credits: 5, departmentCode: "DIOR", requirementType: RequirementType.REQUIRED, semesterNumber: 5 },
    { code: "7202", name: "Estocástica 2", credits: 4, departmentCode: "DMAT", requirementType: RequirementType.REQUIRED, semesterNumber: 5 },
    { code: "7203", name: "Diseño y Análisis de Algoritmo", credits: 4, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 6 },
    { code: "7204", name: "Análisis Numérico", credits: 5, departmentCode: "DMAT", requirementType: RequirementType.REQUIRED, semesterNumber: 6 },
    { code: "7205", name: "Instrumentación 1", credits: 4, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 6 },
    { code: "7206", name: "Modelado y Simulación 1", credits: 4, departmentCode: "DIOR", requirementType: RequirementType.REQUIRED, semesterNumber: 6 },
    { code: "7207", name: "Control 1", credits: 4, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 6 },
    { code: "7113", name: "Señales y Sistemas", credits: 5, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 7 },
    { code: "7208", name: "Estocástica 3", credits: 5, departmentCode: "DMAT", requirementType: RequirementType.REQUIRED, semesterNumber: 7 },
    { code: "7209", name: "Modelado y Simulación 2", credits: 5, departmentCode: "DIOR", requirementType: RequirementType.REQUIRED, semesterNumber: 7 },
    { code: "7210", name: "Investigación de Operaciones 2", credits: 5, departmentCode: "DIOR", requirementType: RequirementType.REQUIRED, semesterNumber: 7 },
    { code: "7211", name: "Evaluación de Proyectos", credits: 5, departmentCode: "DIOR", requirementType: RequirementType.REQUIRED, semesterNumber: 7 },
    { code: "7218", name: "Control 2", credits: 5, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 7 },
    { code: "7220", name: "Instrumentación 2", credits: 4, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 7 },
    { code: "7221", name: "Automatización 1", credits: 5, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 7 },
    { code: "7229", name: "Bases de Datos", credits: 5, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 7 },
    { code: "7230", name: "Ingeniería de Software", credits: 5, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 7 },
    { code: "7231", name: "Teoría de la Computación", credits: 6, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 7 },
    { code: "7232", name: "Sistemas Operativos", credits: 5, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 7 },
    { code: "7212", name: "Estocástica 4", credits: 5, departmentCode: "DMAT", requirementType: RequirementType.REQUIRED, semesterNumber: 8 },
    { code: "7213", name: "Investigación de Operaciones 3", credits: 5, departmentCode: "DIOR", requirementType: RequirementType.REQUIRED, semesterNumber: 8 },
    { code: "7214", name: "Complejidad en Gerencia y Toma de Decisiones", credits: 5, departmentCode: "DHUM", requirementType: RequirementType.REQUIRED, semesterNumber: 8 },
    { code: "7219", name: "Aplicaciones de Procesadores en Control", credits: 4, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 8 },
    { code: "7222", name: "Control 3", credits: 5, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 8 },
    { code: "7224", name: "Laboratorio 1 de Control", credits: 2, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 8 },
    { code: "7225", name: "Laboratorio de Instrumentación", credits: 2, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 8 },
    { code: "7226", name: "Identificación de Sistemas", credits: 5, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 8 },
    { code: "7233", name: "Redes de Computadoras", credits: 5, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 8 },
    { code: "7234", name: "Compiladores", credits: 5, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 8 },
    { code: "7235", name: "Inteligencia Artificial", credits: 5, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 8 },
    { code: "7215", name: "Taller de Investigación de Operaciones", credits: 7, departmentCode: "DIOR", requirementType: RequirementType.REQUIRED, semesterNumber: 9 },
    { code: "7216", name: "Preproyecto", credits: 3, departmentCode: "DHUM", requirementType: RequirementType.REQUIRED, semesterNumber: 9 },
    { code: "7223", name: "Automatización 2", credits: 5, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 9 },
    { code: "7227", name: "Tópicos de Control y Automatización", credits: 4, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 9 },
    { code: "7228", name: "Laboratorio 2 de Control", credits: 2, departmentCode: "DCTL", requirementType: RequirementType.REQUIRED, semesterNumber: 9 },
    { code: "7236", name: "Sistemas Computacionales", credits: 6, departmentCode: "DSIS", requirementType: RequirementType.REQUIRED, semesterNumber: 9 },
    { code: "7217", name: "Proyecto de Grado", credits: 15, departmentCode: "DHUM", requirementType: RequirementType.REQUIRED, semesterNumber: 10 },
    { code: "7237", name: "Dinámica de Sistemas", credits: 4, departmentCode: "DIOR", requirementType: RequirementType.ELECTIVE, semesterNumber: 10 },
    { code: "7238", name: "Economía Ecológica", credits: 4, departmentCode: "DHUM", requirementType: RequirementType.ELECTIVE, semesterNumber: 10 },
    { code: "7239", name: "Modelado de Organizaciones", credits: 4, departmentCode: "DIOR", requirementType: RequirementType.ELECTIVE, semesterNumber: 10 },
    { code: "7263", name: "Sistemas Distribuidos", credits: 4, departmentCode: "DSIS", requirementType: RequirementType.ELECTIVE, semesterNumber: 10 },
    { code: "7267", name: "Computación Gráfica", credits: 4, departmentCode: "DSIS", requirementType: RequirementType.ELECTIVE, semesterNumber: 10 },
    { code: "7269", name: "Inteligencia Artificial Distribuida", credits: 4, departmentCode: "DSIS", requirementType: RequirementType.ELECTIVE, semesterNumber: 10 },
  ];

  // Upsert all subjects
  for (const subjectSeed of subjects) {
    const dept = await prisma.department.findFirst({
      where: { facultyId: faculty.id, code: subjectSeed.departmentCode },
    });

    if (!dept) {
      throw new Error(`Departamento ${subjectSeed.departmentCode} no encontrado para la materia ${subjectSeed.code}`);
    }

    await prisma.subject.upsert({
      where: { code: subjectSeed.code },
      update: {
        name: subjectSeed.name,
        credits: subjectSeed.credits,
        departmentId: dept.id,
        isActive: true,
      },
      create: {
        departmentId: dept.id,
        code: subjectSeed.code,
        name: subjectSeed.name,
        credits: subjectSeed.credits,
        isActive: true,
      },
    });
  }

  // Mapa de prerrequisitos (subjectCode -> [prereqCodes]) basado en el pensum
  const prerequisites: PrerequisiteSeed[] = [
    { subjectCode: "1011", prerequisiteCodes: ["1004"] },
    { subjectCode: "1012", prerequisiteCodes: ["1004"] },
    { subjectCode: "1055", prerequisiteCodes: ["1054"] },
    { subjectCode: "1017", prerequisiteCodes: ["1012", "1011"] },
    { subjectCode: "1018", prerequisiteCodes: ["1012"] },
    { subjectCode: "1052", prerequisiteCodes: ["1011", "1012"] },
    { subjectCode: "1020", prerequisiteCodes: ["1017"] },
    { subjectCode: "1038", prerequisiteCodes: ["1018"] },
    { subjectCode: "1058", prerequisiteCodes: ["1038"] },
    { subjectCode: "1060", prerequisiteCodes: ["1055"] },
    { subjectCode: "7003", prerequisiteCodes: ["1038"] },
    { subjectCode: "7041", prerequisiteCodes: ["1056", "1052", "1038"] },
    { subjectCode: "7200", prerequisiteCodes: ["1038"] },
    { subjectCode: "7201", prerequisiteCodes: ["1038", "1058"] },
    { subjectCode: "7202", prerequisiteCodes: ["1058"] },
    { subjectCode: "7203", prerequisiteCodes: ["1060", "7200"] },
    { subjectCode: "7204", prerequisiteCodes: ["1055", "7003"] },
    { subjectCode: "7205", prerequisiteCodes: ["1020", "7041"] },
    { subjectCode: "7206", prerequisiteCodes: ["7202", "1060"] },
    { subjectCode: "7207", prerequisiteCodes: ["7003", "7041"] },
    { subjectCode: "7113", prerequisiteCodes: ["7207"] },
    { subjectCode: "7208", prerequisiteCodes: ["7003", "7202"] },
    { subjectCode: "7209", prerequisiteCodes: ["7200", "7204", "7206"] },
    { subjectCode: "7210", prerequisiteCodes: ["7201"] },
    { subjectCode: "7211", prerequisiteCodes: ["7202", "1059"] },
    { subjectCode: "7218", prerequisiteCodes: ["7207"] },
    { subjectCode: "7220", prerequisiteCodes: ["7205"] },
    { subjectCode: "7221", prerequisiteCodes: ["7200", "7207"] },
    { subjectCode: "7226", prerequisiteCodes: ["7113", "7041"] },
    { subjectCode: "7233", prerequisiteCodes: ["7232"] },
    { subjectCode: "7234", prerequisiteCodes: ["7231"] },
    { subjectCode: "7235", prerequisiteCodes: ["7203"] },
    { subjectCode: "7215", prerequisiteCodes: ["7208", "7209", "7211", "7212", "7213", "7214"] },
    { subjectCode: "7216", prerequisiteCodes: ["1009", "1006", "1053", "1059", "7201", "7203", "7204", "7205", "7206", "7207"] },
    { subjectCode: "7223", prerequisiteCodes: ["7221"] },
    { subjectCode: "7227", prerequisiteCodes: ["7226", "7222", "7220", "7221", "7219"] },
    { subjectCode: "7228", prerequisiteCodes: ["7222", "7224", "7225"] },
    { subjectCode: "7236", prerequisiteCodes: ["7233", "7234", "7235"] },
    { subjectCode: "7217", prerequisiteCodes: ["7216"] },
    { subjectCode: "7237", prerequisiteCodes: ["7206"] },
    { subjectCode: "7238", prerequisiteCodes: ["1059", "7202"] },
    { subjectCode: "7239", prerequisiteCodes: ["7200", "7201", "7206"] },
    { subjectCode: "7263", prerequisiteCodes: ["7232", "7233"] },
    { subjectCode: "7267", prerequisiteCodes: ["7203"] },
    { subjectCode: "7269", prerequisiteCodes: ["7232", "7235"] },
  ];

  const subjectByCode = new Map<string, { id: string; code: string; name: string }>();

  for (const subjectSeed of subjects) {
    const subject = await prisma.subject.findUnique({ where: { code: subjectSeed.code } });
    if (!subject) {
      throw new Error(`No se pudo encontrar la materia ${subjectSeed.code} después de sembrarla`);
    }
    subjectByCode.set(subject.code, subject);
  }

  for (const prerequisiteSeed of prerequisites) {
    const subject = subjectByCode.get(prerequisiteSeed.subjectCode);
    if (!subject) {
      throw new Error(`No existe la materia base para prelaciones: ${prerequisiteSeed.subjectCode}`);
    }

    for (const prerequisiteCode of prerequisiteSeed.prerequisiteCodes) {
      const prereq = subjectByCode.get(prerequisiteCode);
      if (!prereq) {
        throw new Error(`Prelación inválida: ${prerequisiteSeed.subjectCode} depende de ${prerequisiteCode}, pero esa materia no fue sembrada`);
      }

      await prisma.subjectPrerequisite.upsert({
        where: { subjectId_prerequisiteId: { subjectId: subject.id, prerequisiteId: prereq.id } },
        update: {},
        create: { subjectId: subject.id, prerequisiteId: prereq.id },
      });
    }
  }

  const electiveGroup = await prisma.electiveGroup.findFirst({
    where: {
      curriculumId: curriculum.id,
      name: "Electivas de Profundización",
      semesterNumber: 10,
    },
  });

  const resolvedElectiveGroup = electiveGroup
    ? await prisma.electiveGroup.update({
        where: { id: electiveGroup.id },
        data: {},
      })
    : await prisma.electiveGroup.create({
        data: {
          curriculumId: curriculum.id,
          name: "Electivas de Profundización",
          semesterNumber: 10,
        },
      });

  for (const subjectSeed of subjects) {
    const subject = subjectByCode.get(subjectSeed.code);
    if (!subject) {
      throw new Error(`No existe la materia ${subjectSeed.code} al crear CurriculumSubject`);
    }

    await prisma.curriculumSubject.upsert({
      where: { curriculumId_subjectId: { curriculumId: curriculum.id, subjectId: subject.id } },
      update: {
        semesterNumber: subjectSeed.semesterNumber,
        credits: subjectSeed.credits,
        requirementType: subjectSeed.requirementType,
        electiveGroupId: subjectSeed.requirementType === RequirementType.ELECTIVE ? resolvedElectiveGroup.id : null,
      },
      create: {
        curriculumId: curriculum.id,
        subjectId: subject.id,
        requirementType: subjectSeed.requirementType,
        semesterNumber: subjectSeed.semesterNumber,
        credits: subjectSeed.credits,
        electiveGroupId: subjectSeed.requirementType === RequirementType.ELECTIVE ? resolvedElectiveGroup.id : null,
      },
    });
  }

}

async function main() {
  await seedFacultyStructure();
  await seedSystemsEngineering();
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
