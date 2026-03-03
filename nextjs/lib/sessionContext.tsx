"use server";

// Internal imports
import { headers } from "next/headers";
import { createContext } from "react";

// External imports
import { auth } from "@/lib/auth";

const session = await auth.api.getSession({
  headers: await headers(),
});

export const SessionContext = createContext(null as typeof session);
