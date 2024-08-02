<h1 align="center">🚗 Rentx</h1>

<h3> 💻 Sobre o projeto</h3>

<p>Esse é um sistema construído para realizar/gerenciar os alugueis de carros de um estabelecimento, feito utilizando as seguintes tecnologias:  </p>
<h4>Frontend </h4>
<ul>
  
    - NextJS 13, 
    - Sass/CSS (Modules);
    - Typescript/Javascript;
    - Axios;
    - Material UI;
</ul>
  
<h4>Backend</h5>
<ul>
  
    - Node;
    - Express;
    - Typescript/Javascript;
    - AWS S3 (Armazenamento de imagens);
    - JWT (Controle de tokens/refresh-tokens);
    - Nodemailer (Envio de E-mails);
    - JEST (Testes unitários);
    - MongoDB (Banco de dados NoSQL)
</ul>
 
### ***Observação importante***
#### É interessante que o sistema seja testado com uma conta de administrador, pois assim o usuário terá acesso à todas as funcionalidades disponíveis.
#### Para criar a conta, é só ir em Login > Criar nova conta > Inserir todos os dados.

<hr /> 

<h3>📝 O sistema possui as seguintes funcionalidades</h3>
  <h4>(Usuário comum)</h4>
  <ul>
    <li>Login/Cadastro de usuário;</li>
    <li>Recuperação de senha com envio de E-mail</li>
    <li>Listagem de carros disponíveis para aluguel;</li>
    <li>Tela com informações do carro escolhido e opção de realizar o aluguel do carro;</li>
    <li>Listagem e gerenciamento de alugueis realizados e em andamento com opção de finalizar;</li>
    <li>Área de contato com formulário para envio de E-mail;</li>
    <li>Área 'Sobre' com informações sobre a aplicação.</li>
    <li>Opção de editar os dados do usuário clicando no avatar</li>
  </ul>
<br />

  <h4>(Usuário administrador)</h4>
  <ul>
    <li>Cadastro e gerenciamento de todos os carros, disponíveis ou indisponíveis com opção de editar as informações;</li>
    <li>Upload de imagens dos carros (Armazenamento na AWS S3);</li>
    <li>Cadastro e gerenciamento de categorias;</li>
    <li>Importação de categorias através de arquivo .CSV (Modelo de exemplo disponível para download na página);</li>
    <li>Cadastro e gerenciamento de especificações;</li>
    <li>Gerenciamento de todos os alugueis com opção de editar as informações do aluguel;</li>
  </ul>
  
 <br />

<h2>👷 Como testar? </h2>
<h3>Entre com o seguinte link </h3>
<a href="https://rentx-two.vercel.app/">https://rentx-two.vercel.app/</a>
<h3>Ou</h3>
<li>Clone o repositório com: git clone https://github.com/johnatanso/rentx"</li>
<li>Entre em uma IDE de sua preferência </li>
<li>Instale as dependências com 'npm install'</li>
<li>Execute o servidor na pasta back-end e depois o front-end</li>
<li>Crie uma conta como usuário comum;</li>
<li>Tente realizar um aluguel;</li>
<li>Navege entre as páginas;</li>
<li>Finalize o seu aluguel;</li>
<li>Crie uma conta como administrador;</li>
<li>Cadastre um novo carro ou altere as informações de algum já cadastrado;</li>
<li>Altere a informação de algum aluguel, categoria ou especificação;</li>
<li>Faça a importação de categorias através de um arquivo .CSV</li>
    
<br>

<h2>Imagens do projeto</h2>
<h4>Tela de login do sistema</h4>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/f57ebd24-a9d7-40b5-8b68-949c301def4d" />
<hr />

<h4>Tela de cadastro de usuário</h4>
<i>Recomendo cadastrar como administrador para que seja possível testar todas as funcionalidades do sistema</i>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/e1406edb-f064-4728-a272-c161bf2e88c8" />
<hr />

<h4>Modal para atualização de cados do usuário</h4>
<i>Para exibir o modal, basta clicar no avatar no canto superior direito e depois no nome do usuário</i>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/e2a1cd5e-d9c4-4ab1-a61b-19070c647dc2" />
<hr />

<h4>Tela inicial para usuários</h4>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/4f71cbcc-6f63-4a51-9127-e5c86086787a" />
<hr />

<h4>Tela para realizar o aluguel do carro</h4>
<i>Selecione a data que deseja e as informações referentes ao aluguel serão atualizadas</i>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/0ad8422c-7bd9-419f-afe7-2b1ef5cb1a98" />
<hr />

<h4>Tela com os alugueis já realizados pelo usuário</h4>
<i>É exibido o status do aluguel e as informações referentes à ele. Para finalizar o aluguel, clique em "Devolver carro"</i>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/0ad8422c-7bd9-419f-afe7-2b1ef5cb1a98" />
<hr />

<h4>Tela com os carros favoritados pelo usuário</h4>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/57d81822-a7bd-4fea-8dc6-2aaf56d07591" />
<hr />

<h4>Tela com informações sobre o sistema</h4>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/95e3828c-1d27-407b-9e5c-4d2a8302c331" />
<hr />

<h4>Tela para contato</h4>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/fc8d3f30-49f0-4276-aefe-5d42c5b9e7ba" />
<hr />

<h4>Tela de gestão de carros cadastrados no sistema</h4>
<i>Nesta tela são listados todos os carros cadastrados no sistema. Caso queira cadastrar um novo, é só clicar em "Cadastrar novo" no canto superior direito</i>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/c1051302-05bd-42dc-9d86-86e6d38d0b3d" />
<hr />

<h4>Tela de cadastro de um novo carro</h4>
<i>Preencha as informações do carro, insira uma imagem caso queira e clique em "Finalizar" no canto superior direito</i>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/b28e8162-5e03-4c26-b1a1-035c1105c0c1" />
<hr />

<h4>Tela de alteração de informações de um carro</h4>
<i>Nesta tela é possível alterar as informações do carro, como imagens, nome, placa, categoria, etc.</i>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/e192d540-48eb-452c-a330-550e5a250d0f" />
<hr />

<h4>Tela de gestão de categorias</h4>
<i>Nesta tela são listadas todas as categorias cadastradas com a possibilidade de editar, excluir ou cadastrar uma nova.</i>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/149b979b-eed0-4809-b502-e344e0ffefd4" />
<hr />

<h4>Tela de gestão de todos os alugueis</h4>
<i>Nesta tela são listados todos os alugueis de todos os usuários</i>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/099482ad-125c-41dc-805b-b27a00e0036b" />
<hr />

<h4>Tela de edição de aluguel</h4>
<i>Modal para atualizar os dados de um aluguel</i>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/6c6e6e4e-5cdd-488b-8d2c-ea326268ad49" />
<hr />

<h4>Tela para importação de categorias</h4>
<i>Nesta tela é possível importar categorias através de um arquivo .csv. Ele deverá estar formatado separado por pipe (pipe). Baixe o arquivo de exemplo.</i>
<br />
<img width="700px" src="https://github.com/user-attachments/assets/8388a2a6-e155-460c-94b5-063d11db8e08" />
<hr />


<div>
 <h2>🎓 Autor</h2>
 <h3>Feito com 💜 by <a href="https://github.com/johnatanSO" target="_blank">Johnatan Santos</a></h3>
</div>
