import Link from "next/link"

import { cn } from "@/lib/utils"

const authTabs = [
  { label: "Sign In", href: "/sign-in", page: "sign-in" },
  { label: "Sign Up", href: "/sign-up", page: "sign-up" },
] as const

export function AuthShell({
  page,
  title,
  subtitle,
  children,
}: {
  page: "sign-in" | "sign-up"
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section className="flex min-h-[calc(100svh-4.25rem)] flex-col items-center justify-center bg-neutral-950 px-4 py-16">
      <div className="w-full max-w-md">
        {/* Toggle between Sign In / Sign Up */}
        <div className="mb-6 flex rounded-full bg-neutral-900 p-1 ring-1 ring-white/10">
          {authTabs.map((tab) => (
            <Link
              key={tab.page}
              href={tab.href}
              aria-current={page === tab.page ? "page" : undefined}
              className={cn(
                "flex-1 rounded-full py-2 text-center font-mono text-xs tracking-widest uppercase transition-colors",
                page === tab.page
                  ? "bg-indigo-600 text-white"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="rounded-2xl bg-neutral-900/80 p-6 ring-1 ring-white/10 sm:p-8">
          <h1 className="text-xl font-semibold text-white sm:text-2xl">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-neutral-400">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  )
}
