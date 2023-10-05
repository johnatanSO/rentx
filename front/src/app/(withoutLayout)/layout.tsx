type Props = {
  children: React.ReactNode
}

export default function WithoutLayout({
  children,
}: Props) {
  return (
    <html lang="en">
      <body>

        {children}

      </body>
    </html>
  )
}
