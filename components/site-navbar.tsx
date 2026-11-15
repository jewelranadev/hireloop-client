"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { SiteLogo } from "./site-logo"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

export function SiteNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="mx-auto max-w-7xl">
        <nav className="flex h-14 items-center justify-between rounded-xl bg-neutral-950 pl-4 pr-3 text-white shadow-sm">
          <SiteLogo />

          {/* Desktop links */}
          <div className="hidden items-center gap-7 md:flex">
            <div className="flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div aria-hidden="true" className="h-5 w-px bg-neutral-800" />
            <Link
              href="/sign-in"
              className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Sign In
            </Link>
            <Button
              nativeButton={false}
              render={<Link href="/sign-up" />}
              className="bg-indigo-500 text-white hover:bg-indigo-400"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-white hover:bg-neutral-800 hover:text-white md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={cn(
            "grid rounded-xl bg-neutral-950 text-white transition-all duration-200 md:hidden",
            open
              ? "mt-2 grid-rows-[1fr] opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div aria-hidden="true" className="my-2 h-px bg-neutral-800" />
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-indigo-400 transition-colors hover:bg-neutral-800 hover:text-indigo-300"
              >
                Sign In
              </Link>
              <Button
                nativeButton={false}
                render={<Link href="/sign-up" />}
                onClick={() => setOpen(false)}
                className="mt-1 w-full bg-indigo-500 text-white hover:bg-indigo-400"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
