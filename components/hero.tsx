"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Briefcase, MapPin, Search } from "lucide-react"

import globe from "@/assets/globe.png"

const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (location.trim()) params.set("location", location.trim())
    router.push(`/jobs${params.size > 0 ? `?${params.toString()}` : ""}`)
  }

  return (
    <section className="relative isolate min-h-[calc(100svh-4.25rem)] overflow-hidden bg-neutral-950">
      {/* Stars */}
      <div aria-hidden="true" className="hero-stars absolute inset-0 -z-10" />

      {/* Planet */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-56 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_55%)] sm:h-72"
      >
        <Image
          src={globe}
          alt=""
          priority
          sizes="(max-width: 1440px) 1440px, 100vw"
          className="absolute bottom-0 left-1/2 w-[max(100%,1440px)] max-w-none -translate-x-1/2 translate-y-[31%]"
        />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pt-16 pb-48 text-center sm:pt-24 sm:pb-64">
        {/* Badge */}
        <div className="flex items-center justify-center gap-3">
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-gradient-to-r from-transparent to-neutral-700 sm:block"
          />
          <div className="flex items-center gap-2.5 rounded-full bg-white/5 py-1.5 pr-4 pl-1.5 ring-1 ring-white/10">
            <span className="grid size-6 place-items-center rounded-lg bg-gradient-to-br from-orange-400 to-amber-600">
              <Briefcase className="size-3.5 text-white" />
            </span>
            <span className="text-sm font-semibold text-white">50,000+</span>
            <span className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
              New jobs this month
            </span>
          </div>
          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-gradient-to-l from-transparent to-neutral-700 sm:block"
          />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:mt-8 sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 sm:mt-5 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="mt-8 flex w-full max-w-xl flex-col gap-1.5 rounded-3xl bg-neutral-900/90 p-2 ring-1 ring-white/10 sm:mt-10 sm:flex-row sm:items-center sm:rounded-full sm:p-1.5"
        >
          <label className="flex flex-1 cursor-text items-center gap-2.5 rounded-full px-3.5 py-2">
            <Search className="size-4 shrink-0 text-neutral-500" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none"
            />
          </label>
          <div aria-hidden="true" className="hidden h-6 w-px bg-neutral-800 sm:block" />
          <label className="flex flex-1 cursor-text items-center gap-2.5 rounded-full px-3.5 py-2">
            <MapPin className="size-4 shrink-0 text-neutral-500" />
            <input
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            aria-label="Search jobs"
            className="grid size-10 shrink-0 place-items-center self-end rounded-full bg-indigo-600 text-white transition-colors hover:bg-indigo-500 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:self-auto"
          >
            <Search className="size-4" />
          </button>
        </form>

        {/* Trending positions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm text-neutral-400">
          <span>Trending Position</span>
          {trendingPositions.map((position) => (
            <a
              key={position}
              href={`/jobs?q=${encodeURIComponent(position)}`}
              className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-neutral-300 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
            >
              {position}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
