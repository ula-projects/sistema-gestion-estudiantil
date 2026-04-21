import { auth } from "@/auth";
import LandingPage from "./Landing";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

  return <div></div>;
}
