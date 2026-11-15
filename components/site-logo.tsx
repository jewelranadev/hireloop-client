import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

import logo from "@/assets/logo.png"

export function SiteLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={logo}
        alt="HireLoop"
        priority
        className="h-8 w-auto"
      />
    </Link>
  )
}
