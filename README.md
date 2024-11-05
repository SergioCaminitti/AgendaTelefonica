Agenda Telefônica - Projeto Teste Prático
Este projeto é uma aplicação web de uma Agenda Telefônica que permite cadastrar e pesquisar contatos, com as funcionalidades de cadastro, pesquisa, exclusão e log de alterações, conforme especificado na tarefa.

Tempo Total de Resolução:
Tempo gasto na conclusão da tarefa: [20 horas]

1. Tecnologias Utilizadas
Frontend: React, TypeScript
Backend: Firebase (para armazenamento dos dados)
Banco de Dados: Firebase Firestore (para armazenar contatos e telefones)
Outras: HTML, CSS, JavaScript, Axios (para requisições)

2. Funcionalidades
Tela de Cadastro de Contato
A tela de cadastro de contato permite inserir as informações de um novo contato na agenda, incluindo:

Nome da pessoa.
Idade da pessoa.
Número(s) de telefone. A pessoa pode ter múltiplos números de telefone.
Botão de inclusão para cadastrar um novo contato.
Tela de Pesquisa de Contato
A tela de pesquisa exibe a lista de contatos e permite realizar as seguintes ações:

Pesquisar pelo nome ou número de telefone.
Alterar um contato selecionado.
Excluir um contato selecionado.
A pesquisa pode ser feita por nome ou número de telefone. Quando o campo de pesquisa é limpo, todos os contatos são exibidos novamente.
Funcionalidade de Excluir Contato
Quando um contato é excluído, o sistema gera um log de exclusão com a data e hora da exclusão e o nome do contato excluído, que é gravado em um arquivo de log.

3. Estruturas das Tabelas
A seguir estão as tabelas utilizadas para armazenar os dados no banco de dados.

Tabela: Contato
Atributo	Tipo de Dado	Observação
ID	NUMBER(14)	Chave Primária
NOME	VARCHAR(100)	Nome do contato
IDADE	NUMBER(3)	Idade do contato
Tabela: Telefone
Atributo	Tipo de Dado	Observação
IDCONTATO	NUMBER(14)	Chave Primária e Estrangeira (referência ao ID da tabela Contato)
ID	NUMBER(14)	Chave Primária
NUMERO	VARCHAR(16)	Número de telefone

4. Como Rodar o Projeto Localmente
Pré-requisitos
Node.js instalado. Você pode baixar o Node.js em https://nodejs.org.
Firebase configurado para o projeto. Você deve obter as credenciais de configuração do Firebase que serão enviadas junto com este projeto.
Passo a Passo para Executar o Projeto
Clone o repositório:

bash
Copiar código
git clone https://github.com/usuario/repositorio.git
cd repositorio
Instale as dependências do projeto:

Copiar código
npm install
Configure o Firebase:

No console do Firebase, crie um projeto.
Adicione um app Web.
Copie as credenciais de configuração do Firebase para o arquivo firebase.ts no seu projeto (em src/firebase.ts).
Habilite o Firestore Database no Firebase.
Inicie o servidor de desenvolvimento:

sql
Copiar código
npm start
Acesse o projeto no navegador em http://localhost:3000.

5. Função de Log
A exclusão de contatos é registrada em um arquivo de log. Cada vez que um contato é excluído, as informações seguintes são gravadas:

Nome do contato excluído
Data e hora da exclusão
Exemplo de Log:
arduino
Copiar código
Contato 'João Silva' foi excluído em 2024-11-05 14:30:00.
Os logs são armazenados em um arquivo de texto e podem ser visualizados na pasta logs/ do projeto.

6. Conclusão
Esse projeto foi realizado com o objetivo de simular uma aplicação de agenda telefônica simples, com funcionalidades de cadastro, pesquisa, edição e exclusão de contatos, além de gerar logs de exclusão. Ele foi desenvolvido em React com TypeScript e integrado ao Firebase para persistência dos dados.