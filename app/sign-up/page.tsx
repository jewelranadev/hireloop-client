import type { Metadata } from "next"

import { SignUpForm } from "@/components/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up — HireLoop",
  description:
    "Create a HireLoop account as a job seeker, recruiter, or admin and get started in minutes.",
}

export default function SignUpPage() {
  return <SignUpForm />
}
