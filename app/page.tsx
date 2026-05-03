import { auth } from "@/auth";
import { Role } from "@/src/generated/prisma/enums";
import LandingPage from "./(home)/Landing";
import AdminPage from "./(home)/AdminDashboad";
import StudentPage from "./(home)/StudentDashboard";
import ProfessorPage from "./(home)/ProfessorDashboard";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

  const { user } = session;

  switch (user.role) {
    case Role.ADMIN:
      return <AdminPage />;
    case Role.PROFESSOR:
      return <ProfessorPage />;
    case Role.STUDENT:
      return <StudentPage />;
  }
  return <></>;
}
