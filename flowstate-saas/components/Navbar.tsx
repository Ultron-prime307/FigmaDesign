'use client'

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(96vw,1100px)] -translate-x-1/2 glass px-4 py-3 rounded-full flex items-center gap-4 md:gap-6">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/50" />
        <span className="font-bold text-sm md:text-base">Flowstate</span>
      </div>

      <nav className="hidden md:flex gap-6">
        <Link href="#features" className="text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition">
          Features
        </Link>
        <Link href="#pricing" className="text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition">
          Pricing
        </Link>
        <Link href="#faq" className="text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition">
          FAQ
        </Link>
      </nav>

      <div className="ml-auto hidden md:flex gap-3">
        {session ? (
          <>
            <Link href="/dashboard" className="btn btn-ghost text-xs md:text-sm">
              Dashboard
            </Link>
            <Link href="/api/auth/signout" className="btn btn-ghost text-xs md:text-sm">
              Sign out
            </Link>
          </>
        ) : (
          <>
            <Link href="/auth/signin" className="btn btn-ghost text-xs md:text-sm">
              Sign in
            </Link>
            <Link href="/auth/register" className="btn btn-primary text-xs md:text-sm">
              Get started
            </Link>
          </>
        )}
      </div>

      <button
        type="button"
        className="md:hidden ml-auto rounded-full border border-white/10 bg-white/5 p-2 text-[var(--text-1)] transition hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="block h-0.5 w-5 bg-current transition-all duration-200" style={{ transform: isOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
        <span className={`block h-0.5 w-5 bg-current my-1 transition-all duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
        <span className="block h-0.5 w-5 bg-current transition-all duration-200" style={{ transform: isOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
      </button>

      <div
        className={`absolute right-4 top-full mt-3 min-w-[220px] max-w-xs rounded-3xl glass px-4 py-4 shadow-2xl transition-all duration-300 ${isOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}
      >
        <nav className="flex flex-col gap-3">
          <Link href="#features" className="text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition" onClick={() => setIsOpen(false)}>
            Features
          </Link>
          <Link href="#pricing" className="text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition" onClick={() => setIsOpen(false)}>
            Pricing
          </Link>
          <Link href="#faq" className="text-sm text-[var(--text-2)] hover:text-[var(--text-1)] transition" onClick={() => setIsOpen(false)}>
            FAQ
          </Link>
          <div className="border-t border-white/10 pt-3 mt-2 flex flex-col gap-2">
            {session ? (
              <>
                <Link href="/dashboard" className="btn btn-ghost text-sm w-full text-center" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <Link href="/api/auth/signout" className="btn btn-ghost text-sm w-full text-center" onClick={() => setIsOpen(false)}>
                  Sign out
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="btn btn-ghost text-sm w-full text-center" onClick={() => setIsOpen(false)}>
                  Sign in
                </Link>
                <Link href="/auth/register" className="btn btn-primary text-sm w-full text-center" onClick={() => setIsOpen(false)}>
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
