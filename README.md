### 💊 Farma Server

API REST desenvolvida para atender às demandas de uma rede de farmácias de manipulados, inspirada no conceito da **Oficial Farma**. Este projeto foi criado como parte de uma atividade acadêmica, com o objetivo de explorar tecnologias modernas e boas práticas no desenvolvimento de sistemas escaláveis

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

### 🛠️ Instalação e Configuração

O sistema foi projetado para ser executado via **Docker**, proporcionando maior portabilidade e facilidade na configuração. Para iniciar a instalação, é necessário obter uma cópia local do código-fonte. Isso pode ser feito utilizando o comando:

```bash
git clone https://github.com/davidsantana06/farma-server
```

Após clonar o repositório, é necessário criar um arquivo `.env` com base no modelo disponível em `.env.example`, especificando o valor de `PORT` — a porta na qual a aplicação será executada.

Com o arquivo `.env` configurado, o servidor pode ser executado com o comando:

```bash
docker compose up
```

Para encerrar a execução, utilize:

```bash
docker compose down
```

### 🧪 Cobertura de Testes

O servidor conta com testes unitários que validam suas principais funcionalidades implementadas na camada de serviço. Para executar os testes, utilize o comando:

```bash
npm run test
```

### ⚖️ Licença

Este repositório adota a **Licença MIT**, permitindo o uso e a modificação do código como desejar. Peço apenas que seja dado o devido crédito, reconhecendo o esforço e o tempo investidos no desenvolvimento.
