import type { Metadata } from "next"

import { SignInForm } from "@/components/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In — HireLoop",
  description:
    "Sign in to HireLoop and continue your job search or manage your postings.",
}

export default function SignInPage() {
  return <SignInForm />
}
