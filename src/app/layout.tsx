import { Footer } from "@/layout/Footer"
import { Header } from "@/layout/Header"

type Props = {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: Props) {
  return (
    <html lang="en">
      <Header />
      <body>{children}</body>
      <Footer />
    </html>
  )
}
