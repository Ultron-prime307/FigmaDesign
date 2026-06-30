'use client'

import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass px-6 py-3 rounded-full flex items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/50" />
        <span className="font-bold text-sm">Flowstate</span>
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

      <div className="flex gap-3 ml-auto">
        {session ? (
          <>
            <Link href="/dashboard" className="btn btn-ghost text-xs">
              Dashboard
            </Link>
            <Link href="/api/auth/signout" className="btn btn-ghost text-xs">
              Sign out
            </Link>
          </>
        ) : (
          <>
            <Link href="/auth/signin" className="btn btn-ghost text-xs">
              Sign in
            </Link>
            <Link href="/auth/register" className="btn btn-primary text-xs">
              Get started
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
