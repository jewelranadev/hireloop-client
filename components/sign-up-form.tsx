"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building, Search, ShieldCheck, UserPlus } from "lucide-react"
import { Radio } from "@base-ui/react/radio"
import { RadioGroup } from "@base-ui/react/radio-group"

import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const inputClasses =
  "h-10 rounded-xl border-white/10 bg-white/5 px-3.5 text-white placeholder:text-neutral-500 dark:bg-input/30"

const roles = [
  {
    value: "job-seeker",
    label: "Job Seeker",
    description: "Find jobs and apply",
    icon: Search,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    description: "Post jobs and hire talent",
    icon: Building,
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage the platform",
    icon: ShieldCheck,
  },
]

export function SignUpForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("job-seeker")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)
    const { error: authError } = await authClient.signUp.email({
      name,
      email,
      password,
      role,
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
      page="sign-up"
      title="Create your account"
      subtitle="Join HireLoop and get started in minutes."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm text-neutral-300">
            Full name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="John Doe"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClasses}
          />
        </div>
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
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={inputClasses}
          />
        </div>

        {/* Role selection */}
        <fieldset className="flex flex-col gap-1.5">
          <legend className="mb-0.5 text-sm text-neutral-300">
            I am signing up as
          </legend>
          <RadioGroup
            name="role"
            value={role}
            onValueChange={(value) => setRole(value as string)}
            className="grid gap-2"
          >
            {roles.map((option) => (
              <Radio.Root
                key={option.value}
                value={option.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-colors outline-none select-none",
                  "focus-visible:ring-3 focus-visible:ring-ring/50",
                  role === option.value
                    ? "border-indigo-500/60 bg-indigo-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                )}
              >
                <option.icon
                  className={cn(
                    "size-5 shrink-0",
                    role === option.value ? "text-indigo-400" : "text-neutral-400"
                  )}
                />
                <span className="flex flex-col">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      role === option.value ? "text-white" : "text-neutral-200"
                    )}
                  >
                    {option.label}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {option.description}
                  </span>
                </span>
              </Radio.Root>
            ))}
          </RadioGroup>
        </fieldset>

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
          <UserPlus data-icon="inline-start" />
          {pending ? "Creating account…" : "Create Account"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-400">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Sign in
        </Link>
      </p>
    </AuthShell>
  )
}
