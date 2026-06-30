import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Flowstate — Automate the busywork, keep the judgment calls",
  description: "Automate repetitive tasks while keeping control of what matters. Flowstate helps teams focus on decision-making.",
  openGraph: {
    title: "Flowstate",
    description: "Automate the busywork, keep the judgment calls",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[var(--bg)]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
