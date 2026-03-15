import { ReactNode } from "react";
import Nav from "./Nav";

export default function PageShell({
  children,
  maxWidth = "max-w-5xl",
}: {
  children: ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className={`flex-1 p-6 ${maxWidth} mx-auto w-full flex flex-col gap-6`}>
        {children}
      </main>
    </div>
  );
}
