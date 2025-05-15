"use client";

import { createContext, useContext, ReactNode } from "react";

interface SessionContextType {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
  } | null;
}

const SessionContext = createContext<SessionContextType>({ user: null });

export function useSession() {
  return useContext(SessionContext);
}

export default function SessionProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: SessionContextType["user"];
}) {
  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  );
} 