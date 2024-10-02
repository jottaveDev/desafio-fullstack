# Desafio Full-Stack JackExperts

O desafio proposto pela empressa JackExperts consiste em desenvolver uma aplicação web simples para gerenciar tarefas.

### Requisitos

* Cadastro de Usuário: o usuário deve ser capaz de se cadastrar com e-mail e senha. Implementar validação básica para e-mail e senha.
* Autenticação: implementar login e logout de usuários utilizando JWT (JSON Web Token). Apenas usuários autenticados devem ter acesso às funcionalidades de gerenciamento de tarefas.
* Gerenciamento de Tarefas: listar todas as tarefas do usuário autenticado. Adicionar novas tarefas com um título e uma descrição. Marcar tarefas como concluídas. Editar o título e a descrição de uma tarefa. Excluir uma tarefa.
* Interface de Usuário: a interface deve ser intuitiva e responsiva. Implementar a interface utilizando React. Utilizar hooks do React para gerenciar estado e efeitos colaterais.

### Tecnologias Utilizadas

* JavaScript
* TypeScript
* React
* NodeJS
* Express
* SQLite
* Prisma

### Como rodar o projeto

Primeiramente, clone o projeto:

```
git clone https://github.com/jottaveDev/desafio-fullstack.git
```

Agora é necessário instalar as dependências separadamente.
Entre em cada pasta (api e client) e digite o seguinte comando:

```
npm install
```

Precisamos subir o servidor de cada pasta (api e client) localmente.
Basta iniciar o projeto com:

```
npm run dev | npm run start:dev
```

Por fim, só acessar o link disponibilizado no terminal.
