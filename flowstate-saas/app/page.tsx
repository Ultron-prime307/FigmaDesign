import Navbar from "@/components/Navbar"
import Link from "next/link"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="hero pt-32 pb-20 sm:pt-40 sm:pb-24 px-4 text-center relative z-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="absolute left-1/2 top-10 -translate-x-1/2 h-80 w-80 rounded-full bg-[rgba(143,116,255,0.18)] blur-3xl animate-pulse-slow" />
          <span className="absolute right-6 top-24 h-52 w-52 rounded-full bg-[rgba(77,215,255,0.16)] blur-3xl animate-pulse-slow" />
          <span className="absolute left-6 bottom-16 h-24 w-24 rounded-full border border-cyan-400/30 shadow-[0_0_80px_rgba(77,215,255,0.2)]" />
          <span className="absolute right-1/3 bottom-32 h-48 w-48 rounded-full border border-violet-400/20 shadow-[0_0_120px_rgba(143,116,255,0.25)]" />
        </div>

        <div className="wrap relative z-10">
          <div className="eyebrow">
            <span>✨ Introducing Flowstate</span>
          </div>
          <h1 className="mb-6 max-w-4xl mx-auto text-4xl sm:text-5xl md:text-6xl leading-tight bg-gradient-to-r from-cyan-100 via-white to-violet-100 bg-clip-text text-transparent">
            Automate the busywork,<br />keep the judgment calls
          </h1>
          <p className="lead max-w-2xl mx-auto mb-12 text-base sm:text-lg text-[var(--text-2)]">
            Flowstate handles the repetitive tasks while you focus on decisions that matter. No more manual busywork—just smart automation and meaningful control.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link href="/auth/register" className="btn btn-primary w-full sm:w-auto">
              Start free trial
            </Link>
            <Link href="#features" className="btn btn-ghost w-full sm:w-auto">
              Learn more
            </Link>
          </div>

          <div className="glass rounded-[2rem] overflow-hidden max-w-3xl mx-auto">
            <div className="bg-[var(--glass-strong)] border-b border-[var(--glass-border)] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-[var(--text-3)] font-mono">
                flowstate-dashboard.app
              </span>
            </div>
            <div className="p-6 sm:p-8 bg-gradient-to-br from-[var(--bg-2)] to-[var(--bg)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-strong rounded-3xl p-5">
                  <div className="text-3xl font-mono font-bold">1,234</div>
                  <div className="text-xs text-[var(--text-3)] mt-3">Tasks Automated</div>
                </div>
                <div className="glass-strong rounded-3xl p-5">
                  <div className="text-3xl font-mono font-bold">15h</div>
                  <div className="text-xs text-[var(--text-3)] mt-3">Time Saved</div>
                </div>
                <div className="glass-strong rounded-3xl p-5">
                  <div className="text-3xl font-mono font-bold">98%</div>
                  <div className="text-xs text-[var(--text-3)] mt-3">Accuracy</div>
                </div>
                <div className="glass-strong rounded-3xl p-5">
                  <div className="text-3xl font-mono font-bold">24/7</div>
                  <div className="text-xs text-[var(--text-3)] mt-3">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 relative">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Features</div>
            <h2>Everything you need to automate smarter</h2>
            <p>
              Built for teams that want to eliminate repetitive work without losing control.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              {
                title: "No-Code Automation",
                description: "Build workflows without writing a single line of code. Visual workflow builder with drag-and-drop simplicity.",
                icon: "⚙️"
              },
              {
                title: "Real-Time Sync",
                description: "Connect all your tools and keep data in sync across platforms. Support for 500+ integrations.",
                icon: "🔄"
              },
              {
                title: "Smart Triggers",
                description: "Automate based on conditions, schedules, or manual triggers. Always in control of what runs when.",
                icon: "⚡"
              },
              {
                title: "Analytics & Insights",
                description: "Track automation performance, time saved, and cost reduction in real-time.",
                icon: "📊"
              },
              {
                title: "Team Collaboration",
                description: "Share workflows, set permissions, and work together seamlessly across your team.",
                icon: "👥"
              },
              {
                title: "Enterprise Security",
                description: "SOC2 certified, encryption at rest & in transit, and compliance with major standards.",
                icon: "🔒"
              }
            ].map((feature, i) => (
              <div key={i} className="glass rounded-2xl p-8 hover:bg-[var(--glass-strong)] transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="mb-3">{feature.title}</h3>
                <p className="text-sm text-[var(--text-2)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 relative">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Pricing</div>
            <h2>Simple, transparent pricing</h2>
            <p>
              Start free. Scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                tier: "Starter",
                price: "0",
                features: ["Up to 10 automations", "Basic integrations", "Community support"]
              },
              {
                tier: "Pro",
                price: "99",
                featured: true,
                features: ["Unlimited automations", "500+ integrations", "Priority support", "Team collaboration", "Advanced analytics"]
              },
              {
                tier: "Enterprise",
                price: "Custom",
                features: ["Everything in Pro", "SSO & SAML", "Custom integrations", "Dedicated support", "SLA guarantee"]
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`glass rounded-2xl p-8 flex flex-col ${
                  plan.featured
                    ? 'ring-2 ring-offset-2 ring-offset-[var(--bg)] ring-violet-500 scale-105'
                    : ''
                }`}
              >
                {plan.featured && (
                  <div className="inline-block bg-gradient-to-r from-violet-500 to-cyan-400 text-[var(--bg)] text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
                    Most Popular
                  </div>
                )}
                <div className="mb-2 text-[var(--text-3)] text-sm font-mono uppercase tracking-widest">
                  {plan.tier}
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-[var(--text-3)] text-sm">/month</span>}
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <span className="text-cyan-400 font-bold mt-1">✓</span>
                      <span className="text-[var(--text-2)]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`btn ${plan.featured ? 'btn-primary' : 'btn-ghost'} w-full`}>
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 relative">
        <div className="wrap max-w-2xl">
          <div className="section-head">
            <div className="eyebrow">FAQ</div>
            <h2>Common questions</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "How do I get started?",
                a: "Sign up for free and create your first automation in minutes. No credit card required."
              },
              {
                q: "What integrations are supported?",
                a: "We support 500+ integrations including Slack, Zapier, Make, Google Workspace, Microsoft 365, and more. Custom integrations available on Enterprise plan."
              },
              {
                q: "Is my data secure?",
                a: "Yes. We're SOC2 certified, use end-to-end encryption, and comply with GDPR, HIPAA, and SOC2 Type II standards."
              },
              {
                q: "Can I export my automations?",
                a: "Absolutely. You can export your workflows as JSON and import them into other workspaces or teams."
              },
              {
                q: "Do you offer a free trial?",
                a: "Yes! The Starter plan is completely free forever. Try Pro with a 14-day free trial."
              }
            ].map((item, i) => (
              <details key={i} className="glass rounded-lg p-6 group cursor-pointer">
                <summary className="flex justify-between items-center font-semibold text-[var(--text-1)] marker:content-none">
                  {item.q}
                  <span className="text-xl text-[var(--text-3)] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-[var(--text-2)] text-sm mt-4 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative">
        <div className="wrap">
          <div className="glass rounded-2xl p-12 text-center">
            <h2 className="mb-4">Ready to stop wasting time on busywork?</h2>
            <p className="max-w-md mx-auto text-[var(--text-2)] mb-8">
              Join thousands of teams automating their workflows with Flowstate.
            </p>
            <Link href="/auth/register" className="btn btn-primary inline-block">
              Start your free trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--glass-border)] py-12 px-4">
        <div className="wrap">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bold mb-4">Flowstate</div>
              <p className="text-sm text-[var(--text-3)]">
                Automate the busywork, keep the judgment calls.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[var(--text-3)] uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-[var(--text-2)]">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
                <li><Link href="#faq">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[var(--text-3)] uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-[var(--text-2)]">
                <li><Link href="#">Privacy</Link></li>
                <li><Link href="#">Terms</Link></li>
                <li><Link href="#">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[var(--text-3)] uppercase tracking-wider mb-4">
                Social
              </h4>
              <ul className="space-y-2 text-sm text-[var(--text-2)]">
                <li><Link href="#">Twitter</Link></li>
                <li><Link href="#">GitHub</Link></li>
                <li><Link href="#">Discord</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--glass-border)] pt-8 flex justify-between items-center text-sm text-[var(--text-3)]">
            <p>&copy; 2024 Flowstate. All rights reserved.</p>
            <p>Made with ❤️</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
