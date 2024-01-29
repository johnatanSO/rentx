import { ResetPassword } from '@/components/screens/ResetPassword'

type PageProps = {
  searchParams: {
    refreshToken: string
  }
}

export default function ResetPasswordPage({
  searchParams: { refreshToken },
}: PageProps) {
  return <ResetPassword refreshToken={refreshToken} />
}
