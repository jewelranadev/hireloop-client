"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogIn } from "lucide-react"

import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

const inputClasses =
  "h-10 rounded-xl border-white/10 bg-white/5 px-3.5 text-white placeholder:text-neutral-500 dark:bg-input/30"

export function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)
    const { error: authError } = await authClient.signIn.email({
      email,
      password,
    })
    setPending(false)
    if (authError) {
      setError(authError.message ?? "Something went wrong. Please try again.")
      return
    }
    router.push("/")
  }

  return (
    <AuthShell
      page="sign-in"
      title="Sign in to HireLoop"
      subtitle="Welcome back! Enter your details to continue."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm text-neutral-300">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm text-neutral-300">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={inputClasses}
          />
        </div>
        {error && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}
        <Button
          type="submit"
          disabled={pending}
          className="mt-2 h-10 w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-500"
        >
          <LogIn data-icon="inline-start" />
          {pending ? "Signing in…" : "Sign In"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Create one
        </Link>
      </p>
    </AuthShell>
  )
}
