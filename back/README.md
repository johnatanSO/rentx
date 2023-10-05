# Cadastro de carros
**RF**
Deve ser possível cadastrar um novo carro;
Deve ser possível listar todas as categorias.

**RN**
Não deve ser possível cadastrar um carro com uma placa que já existe;
Não deve ser possível alterar a placa de um carro já cadastrado;
O carro deve ser cadastrado como 'Disponível' por padrão;
Um carro só pode ser cadastrado por um usuário 'Administrador'.

# Listagem de carros
**RF**
Deve ser possível listar todos os carros disponíveis;
Deve ser possível filtrar os carros disponíveis por:
  - Nome da categoria;
  - Nome do carro;
  - Marca do carro.


**RN**
Não é necessário estar autenticado para listar os carros;

# Cadastro de especificação no carro
**RF**
Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**RN**
Não deve ser possível cadastrar uma especificação se não existir um carro cadastrado;
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro;
Uma especificação só pode ser cadastrada por um usuário 'Administrador'.

# Cadastro de imagens do carro
**RF**
Deve ser possível cadastrar uma imagem para o carro;
Deve ser possível listar todos os caros;

**RNF**
Utilizar o multer para fazer upload dos arquivos;

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
Não deve ser possível cadastrar uma imagem se não existir um carro já cadastrado;
Uma imagem só pode ser cadastrada por um usuário 'Administrador'.


# Aluguel do carro
**RF**
Deve ser possível agendar o aluguel de um carro;

**RN**
O aluguel deve ter duração mínima de 24 hora;
Só seve ser possível fazer um aluguel se o usuário estiver autenticado;
Não deve ser possível fazer um novo aluguel se já existir um outro aluguel aberto com mesmo usuário;
Não deve ser possível fazer um novo aluguel se já existir um outro aluguel aberto com o mesmo carro;

