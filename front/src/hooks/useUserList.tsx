import { AlertContext } from '@/contexts/alertContext'
import { IUser } from '@/models/interfaces/IUser'
import { httpClientProvider } from '@/providers/HttpClientProvider'
import { getUsersService } from '@/services/user/getUsers/GetUsersService'
import { useContext, useEffect, useState } from 'react'

export function useUserList() {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const [users, setUsers] = useState<IUser[]>([])

  function getListUsers() {
    getUsersService(httpClientProvider)
      .then((res) => {
        setUsers(res.data.items)
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          text: `Erro ao tentar fazer busca de usuários - ${err?.message}`,
          type: 'error',
        })
      })
  }

  useEffect(() => {
    getListUsers()
  }, [])

  return {
    users,
  }
}
