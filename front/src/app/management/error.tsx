'use client'

import { useEffect } from 'react'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Erro no sistema</h2>
      <button type="button" onClick={reset}>
        <p>{error?.message || 'Error undefined'}</p>
        Tente novamente
      </button>
    </div>
  )
}
