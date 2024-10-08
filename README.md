<h1 align="center">🚗 Rentx</h1>

<h3> 💻 Sobre o projeto</h3>

<p>Esse é um sistema construído para realizar/gerenciar os alugueis de carros de um estabelecimento.  </p>
<p>Usuários comuns podem realizar alugueis e acompanhar os alugueis já realizados, e usuários admistrativos podem gerenciar todos os dados do sistema, como: Carros, categorias, alugueis, etc.</p>
<h2>🚀 Tecnologias utilizadas </h2>
<h4>Frontend </h4>
<ul>
  
    - NextJS 13 / ReactJS,
    - React Hook Form;
    - Zod;
    - Context API;
    - Sass / CSS (Modules);
    - Typescript / Javascript;
    - Axios;
    - Material UI;
</ul>
  
<h4>Backend</h5>
<ul>
  
    - Node;
    - Express;
    - Typescript / Javascript;
    - Firebase (Armazenamento de imagens);
    - JWT (Controle de tokens/refresh-tokens);
    - Nodemailer (Envio de E-mails);
    - JEST (Testes unitários);
    - MongoDB (Banco de dados NoSQL)
</ul>
 
### ***Observação importante***
#### É interessante que o sistema seja testado com uma conta de administrador, pois assim o usuário terá acesso à todas as funcionalidades disponíveis.
#### Para criar a conta, é só ir em Login > Criar nova conta > Inserir todos os dados > Marcar a caixa "Administrador".

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
    <li>Upload de imagens dos carros (Armazenamento no Firebase);</li>
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
<li>Execute o servidor na pasta back-end e depois execute o front-end</li>
<li>Crie uma conta como usuário administrador;</li>
<li>Realize um aluguel um aluguel;</li>
<li>Navege entre as páginas;</li>
<li>Finalize o seu aluguel;</li>
<li>Entre na área de gestão;</li>
<li>Cadastre um novo carro ou altere as informações de algum já cadastrado;</li>
<li>Altere a informação de algum aluguel, categoria ou especificação;</li>
<li>Faça a importação de categorias através de um arquivo .CSV</li>
    
<br>

<h2>Imagens do projeto</h2>
<h4>Tela de login do sistema</h4>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/398220b9-f93c-4b60-917e-c1d633f1b73e" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/6b4f9870-17e4-4831-b2f0-58001eb15f16" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Tela de cadastro de usuário</h4>
<i>Recomendo cadastrar como administrador para que seja possível testar todas as funcionalidades do sistema</i>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e1406edb-f064-4728-a272-c161bf2e88c8" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/f3e10e47-b8f0-4081-8886-55a70132ab04" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Modal para atualização de dados do usuário</h4>
<i>Para exibir o modal, basta clicar no avatar no canto superior direito e depois no nome do usuário</i>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e2a1cd5e-d9c4-4ab1-a61b-19070c647dc2" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/d119c70d-b26b-461b-8406-156dc093f648" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Tela inicial para usuários</h4>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/4f71cbcc-6f63-4a51-9127-e5c86086787a" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/ed556d41-d6b7-40ad-973c-2ea7ed64b482" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Tela para realizar o aluguel do carro</h4>
<i>Selecione a data que deseja e as informações referentes ao aluguel serão atualizadas</i>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/0ad8422c-7bd9-419f-afe7-2b1ef5cb1a98" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/9d018af0-9143-4e5c-8ae4-8335262f15d3" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Tela com os alugueis já realizados pelo usuário</h4>
<i>É exibido o status do aluguel e as informações referentes à ele. Para finalizar o aluguel, clique em "Devolver carro"</i>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/79d4f2f1-3b31-46c5-94f5-c0e5a36e6ff5" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/de24ea1c-9ab5-4e31-b2de-66f2bd0a623f" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Tela com os carros favoritados pelo usuário</h4>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/57d81822-a7bd-4fea-8dc6-2aaf56d07591" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/05a41fb3-9cae-49ef-95ef-d69c7ef484e8" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Tela com informações sobre o sistema</h4>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/95e3828c-1d27-407b-9e5c-4d2a8302c331" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/ccf1b10e-46b6-40fb-899c-7213106e79b9" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Tela para contato</h4>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/fc8d3f30-49f0-4276-aefe-5d42c5b9e7ba" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/6dabb885-82c4-4046-b55e-a9d3f0ea53b2" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Tela de gestão de carros cadastrados no sistema</h4>
<i>Nesta tela são listados todos os carros cadastrados no sistema. Caso queira cadastrar um novo, é só clicar em "Cadastrar novo" no canto superior direito</i><br />
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/c1051302-05bd-42dc-9d86-86e6d38d0b3d" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/01935e20-f67a-480a-8613-f812061f6fb6" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Tela de cadastro de um novo carro</h4>
<i>Preencha as informações do carro, insira uma imagem caso queira e clique em "Finalizar" no canto superior direito</i>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/b28e8162-5e03-4c26-b1a1-035c1105c0c1" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/974ba3ac-51ed-491c-a0de-85d602b9484e" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Tela de alteração de informações de um carro</h4>
<i>Nesta tela é possível alterar as informações do carro, como imagens, nome, placa, categoria, etc.</i>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e192d540-48eb-452c-a330-550e5a250d0f" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/743c892f-534d-493d-ade5-3e5dcb57d6d8" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Tela de gestão de categorias</h4>
<i>Nesta tela são listadas todas as categorias cadastradas com a possibilidade de editar, excluir ou cadastrar uma nova.</i>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/149b979b-eed0-4809-b502-e344e0ffefd4" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/60863d94-844a-4da8-8bb0-fafe92664a82" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Tela de gestão de todos os alugueis</h4>
<i>Nesta tela são listados todos os alugueis de todos os usuários</i>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/099482ad-125c-41dc-805b-b27a00e0036b" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/46767fb6-100d-422f-a53a-a8cf5460b806" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Modal para edição de aluguel</h4>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/6c6e6e4e-5cdd-488b-8d2c-ea326268ad49" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/72172834-1551-4962-bf99-ff3a4d395e0c" /></td>
  </tr>
</table>
<hr />
<br />

<h4>Tela para importação de categorias</h4>
<i>Nesta tela é possível importar categorias através de um arquivo .csv. Ele deverá estar formatado separado por pipe (pipe). Baixe o arquivo de exemplo.</i><br />
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/8388a2a6-e155-460c-94b5-063d11db8e08" /></td>
    <td><img width="700px" src="https://github.com/user-attachments/assets/a65758cd-66af-413e-9995-557828e91e45" /></td>
  </tr>
</table>
<hr />
<br />


<div>
 <h2>🎓 Autor</h2>
 <h3>Feito com 💜 by <a href="https://github.com/johnatanSO" target="_blank">Johnatan Santos</a></h3>
</div>
