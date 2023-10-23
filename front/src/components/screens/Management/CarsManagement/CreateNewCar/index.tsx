import { CustomTextField } from '@/components/_ui/CustomTextField'
import { MenuItem } from '@mui/material'
import { FormEvent } from 'react'

export function CreateNewCar() {
  function onSubmitCar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form onSubmit={onSubmitCar}>
      <h2>Cadastro de carro</h2>
      <CustomTextField
        placeholder="Digite o nome"
        type="text"
        size="small"
        label="Nome do carro"
      />
      <CustomTextField
        placeholder="Digite a marca"
        type="text"
        size="small"
        label="Marca"
      />
      <CustomTextField
        placeholder="Digite a placa"
        type="text"
        size="small"
        label="Placa"
      />
      <CustomTextField
        placeholder="Selecione o tipo de transmissão"
        select
        size="small"
        label="Transmissão"
      >
        <MenuItem value="automatic">Automático</MenuItem>
        <MenuItem value="automatic">Manual</MenuItem>
      </CustomTextField>
      <CustomTextField
        placeholder="Digite o valor da diária"
        type="number"
        size="small"
        label="Valor"
      />
    </form>
  )
}
