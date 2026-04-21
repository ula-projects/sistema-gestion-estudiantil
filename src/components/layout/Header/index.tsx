import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import SignOutBtn from "./SignOutBtn";

export default async function Header() {
  const session = await auth();

  return (
    <header className="bg-[#27baf9] dark:bg-gray-800 shadow-xl h-16 flex justify-between">
      <div className="h-16 flex flex-col justify-center ml-2">
        <Link href="/">
          <Image
            src="/images/ula-logo-white.png"
            width={270}
            height={72}
            alt="ULA Logo"
            className="w-50"
            loading="eager"
          />
        </Link>
      </div>

      <div className="mr-2 h-16 flex flex-col justify-center text-white font-semibold">
        {!session?.user ? (
          <Link
            href="/login"
            className="px-4 py-2 border-white border-2 rounded-lg"
          >
            Login
          </Link>
        ) : (
          <SignOutBtn />
        )}
      </div>
    </header>
  );
}
