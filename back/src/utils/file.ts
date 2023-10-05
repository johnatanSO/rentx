import fs from 'fs'

export const deleteFile = async (filename: string) => {
  try {
    // Verifica se o arquivo existe
    await fs.promises.stat(filename)
  } catch (err) {
    // Caso ele não exista, vai cair aqui no catch e retornar a função
    return
  }

  // Caso exista, ele passa o try/catch e executa esta função
  await fs.promises.unlink(filename)
}
