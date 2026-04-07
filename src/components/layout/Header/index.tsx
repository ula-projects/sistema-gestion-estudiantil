import Image from "next/image";
export default function Header() {
  return (
    <header className="bg-blue-400 dark:bg-gray-800 shadow-xl">
      <div className="">
        <Image
          src="/images/ula-logo-white.png"
          width={270}
          height={72}
          alt="ULA Logo"
          className="w-50 m-2"
        />
      </div>
    </header>
  );
}
