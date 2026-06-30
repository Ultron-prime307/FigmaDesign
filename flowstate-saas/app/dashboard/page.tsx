'use client'

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Automation {
  id: string
  name: string
  description: string | null
  enabled: boolean
  createdAt: string
  lastRun: string | null
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [automations, setAutomations] = useState<Automation[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewForm, setShowNewForm] = useState(false)
  const [newAutomation, setNewAutomation] = useState({
    name: "",
    description: "",
    config: "{}",
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      fetchAutomations()
    }
  }, [session])

  async function fetchAutomations() {
    try {
      const res = await fetch("/api/automations")
      if (res.ok) {
        const data = await res.json()
        setAutomations(data)
      }
    } catch (error) {
      console.error("Failed to fetch automations:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateAutomation(e: React.FormEvent) {
    e.preventDefault()

    try {
      const res = await fetch("/api/automations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newAutomation.name,
          description: newAutomation.description,
          config: JSON.parse(newAutomation.config || "{}"),
        }),
      })

      if (res.ok) {
        const automation = await res.json()
        setAutomations([automation, ...automations])
        setShowNewForm(false)
        setNewAutomation({ name: "", description: "", config: "{}" })
      }
    } catch (error) {
      console.error("Failed to create automation:", error)
    }
  }

  async function handleDeleteAutomation(id: string) {
    if (!confirm("Are you sure you want to delete this automation?")) return

    try {
      const res = await fetch(`/api/automations/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setAutomations(automations.filter((a) => a.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete automation:", error)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--glass-border)] border-t-[var(--accent-violet)] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--text-2)]">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="border-b border-[var(--glass-border)] backdrop-blur supports-[backdrop-filter]:bg-[var(--glass)]">
        <div className="wrap py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-[var(--text-3)] text-sm">Welcome, {session?.user?.name || session?.user?.email}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="btn btn-ghost text-sm">
              Home
            </Link>
            <button
              onClick={() => signOut()}
              className="btn btn-primary text-sm"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="wrap py-12">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Your Automations</h2>
            <button
              onClick={() => setShowNewForm(!showNewForm)}
              className="btn btn-primary text-sm"
            >
              {showNewForm ? "Cancel" : "Create new"}
            </button>
          </div>

          {showNewForm && (
            <form
              onSubmit={handleCreateAutomation}
              className="glass rounded-lg p-6 mb-8"
            >
              <h3 className="font-bold mb-4">Create New Automation</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={newAutomation.name}
                    onChange={(e) =>
                      setNewAutomation({ ...newAutomation, name: e.target.value })
                    }
                    className="w-full bg-[var(--glass-strong)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-[var(--text-1)] placeholder-[var(--text-3)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-violet)]"
                    placeholder="My automation"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={newAutomation.description}
                    onChange={(e) =>
                      setNewAutomation({
                        ...newAutomation,
                        description: e.target.value,
                      })
                    }
                    className="w-full bg-[var(--glass-strong)] border border-[var(--glass-border)] rounded-lg px-4 py-2 text-[var(--text-1)] placeholder-[var(--text-3)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-violet)] h-24 resize-none"
                    placeholder="What does this automation do?"
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn btn-primary">
                    Create automation
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {automations.length === 0 ? (
          <div className="glass rounded-lg p-12 text-center">
            <p className="text-[var(--text-2)] mb-4">No automations yet</p>
            <button
              onClick={() => setShowNewForm(true)}
              className="btn btn-primary"
            >
              Create your first automation
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {automations.map((automation) => (
              <div
                key={automation.id}
                className="glass rounded-lg p-6 flex justify-between items-start hover:bg-[var(--glass-strong)] transition"
              >
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{automation.name}</h3>
                  {automation.description && (
                    <p className="text-sm text-[var(--text-2)] mb-3">
                      {automation.description}
                    </p>
                  )}
                  <div className="flex gap-4 text-xs text-[var(--text-3)]">
                    <span>
                      Status:{" "}
                      <span
                        className={`font-bold ${
                          automation.enabled
                            ? "text-green-400"
                            : "text-orange-400"
                        }`}
                      >
                        {automation.enabled ? "Active" : "Inactive"}
                      </span>
                    </span>
                    {automation.lastRun && (
                      <span>
                        Last run: {new Date(automation.lastRun).toLocaleDateString()}
                      </span>
                    )}
                    <span>
                      Created: {new Date(automation.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="btn btn-ghost text-xs">Edit</button>
                  <button
                    onClick={() => handleDeleteAutomation(automation.id)}
                    className="btn btn-ghost text-xs text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
