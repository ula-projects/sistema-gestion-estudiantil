import Header from "@/src/components/layout/Header";
import { PropsWithChildren } from "react";
export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
