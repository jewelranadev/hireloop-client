import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000",
  // Gives the client the server's inferred types, including the custom
  // `role` user field defined in lib/auth.ts (type-only, no runtime cost).
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { useSession } = authClient
