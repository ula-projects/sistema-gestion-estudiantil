import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-400 dark:bg-gray-800 shadow-xl h-16 flex justify-between">
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

      <div className="mr-2 h-16 flex flex-col justify-center">
        <Link
          href="/login"
          className="px-4 py-2 border-white border rounded-lg"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
