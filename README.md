# 🚛 TMS — Sistema de Gestão de Transporte

Aplicação web full-stack para gerenciamento de Ordens de Coleta e Entrega (OCEs), motoristas e rotas.

---

## 📋 Tecnologias Utilizadas

| Camada    | Tecnologia              | Versão  |
|-----------|-------------------------|---------|
| Frontend  | React + TypeScript      | 18 / 5  |
| Frontend  | Vite                    | 5.x     |
| Frontend  | Tailwind CSS            | 3.x     |
| Frontend  | React Hook Form + Zod   | —       |
| Frontend  | React Router DOM        | 6.x     |
| Backend   | Laravel                 | 12.x    |
| Backend   | PHP                     | 8.4     |
| Backend   | Laravel Sanctum         | 4.x     |
| Banco     | MySQL                   | 8.0     |
| Infra     | Docker + Docker Compose | —       |

---

## 📁 Estrutura do Projeto
```
tms/
├── backend/              # API Laravel
│   ├── .env.docker       # Env usado pelo Docker (já configurado)
│   ├── .env.example      # Env para rodar localmente
│   └── Dockerfile
├── frontend/             # SPA React
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 🚀 Opção 1 — Rodando com Docker (recomendado)

Não requer MySQL instalado. O Docker sobe tudo isolado e automaticamente.

### Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando

### Passo a passo

**1. Clone o repositório:**
```bash
git clone https://github.com/MateusCizeski/tms
cd tms
```

**2. Suba o ambiente:**
```bash
docker compose up --build
```

O Docker irá automaticamente:
- Criar um banco MySQL isolado
- Instalar as dependências PHP via Composer
- Executar as migrations e popular o banco com dados de exemplo
- Iniciar o backend em `http://localhost:8000`
- Iniciar o frontend em `http://localhost:5173`

> ⏳ Na primeira execução aguarde cerca de 2-3 minutos até tudo estar pronto.

**3. Acesse a aplicação:**
- Frontend: http://localhost:5173
- API: http://localhost:8000/api/v1

**Login padrão:**
```
E-mail: admin@tms.com
Senha:  password
```

### Parar o ambiente
```bash
docker compose down
```

### Parar e remover os dados do banco
```bash
docker compose down -v
```

---

## 💻 Opção 2 — Rodando Localmente

### Pré-requisitos
- PHP 8.4+
- Composer
- Node.js 20+
- MySQL 8.0 rodando localmente

### Backend (Laravel)

**1. Entre na pasta e instale as dependências:**
```bash
cd backend
composer install
```

**2. Configure o ambiente:**
```bash
cp .env.example .env
```

**3. Edite o `.env` com suas credenciais MySQL:**
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tms_db
DB_USERNAME=root
DB_PASSWORD=sua_senha
```

**4. Crie o banco de dados:**
```sql
CREATE DATABASE tms_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**5. Rode as migrations e o seeder:**
```bash
php artisan migrate --seed
```

**6. Inicie o servidor:**
```bash
php artisan serve
```
API disponível em: http://localhost:8000

---

### Frontend (React)

**1. Em outro terminal, entre na pasta:**
```bash
cd frontend
npm install
```

**2. Configure o ambiente:**
```bash
cp .env.example .env
```

**3. Inicie o servidor:**
```bash
npm run dev
```
Frontend disponível em: http://localhost:5173

**Login padrão:**
```
E-mail: admin@tms.com
Senha:  password
```

---

## 🧪 Rodando os Testes

Os testes usam SQLite in-memory e não afetam o banco de dados da aplicação.

### Pré-requisito
A extensão `pdo_sqlite` deve estar habilitada no `php.ini`.
```bash
cd backend
php artisan test
```

### Resultado esperado
```
PASS  Tests\Unit\ExampleTest           (1 teste)
PASS  Tests\Feature\AuthTest           (4 testes)
PASS  Tests\Feature\DriverTest         (7 testes)
PASS  Tests\Feature\TransportOrderTest (14 testes)

Tests: 26 passed
```

---

## 🔑 Variáveis de Ambiente

### `backend/.env.example` — para rodar localmente
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tms_db
DB_USERNAME=root
DB_PASSWORD=          # sua senha local
FRONTEND_URL=http://localhost:5173
```

### `backend/.env.docker` — usado automaticamente pelo Docker
Já está configurado e commitado. Não é necessário editar.

### `frontend/.env.example`
```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## ✨ Funcionalidades

### Dashboard
- Cards com totais: Total de Ordens, Pendentes, Em Andamento e Entregues
- Tabela com as últimas 10 ordens cadastradas

### Motoristas
- Listagem completa com todas as informações
- Cadastro e edição via modal
- Inativar/ativar com confirmação

### Ordens de Transporte
- Listagem paginada com filtros por status e motorista
- Criação e edição via modal
- Avanço de status com botão intuitivo (Pendente → Em Coleta → Coletado → Em Entrega → Entregue)
- Exclusão apenas de ordens pendentes, com confirmação

### Autenticação
- Login/logout com Laravel Sanctum
- Rotas protegidas por token Bearer
- Redirecionamento automático para login ao expirar sessão

---

## 🏗️ Diferenciais Implementados

- ✅ Autenticação com Laravel Sanctum
- ✅ Testes automatizados com PHPUnit (26 testes)
- ✅ Paginação nas listagens
- ✅ Validação de formulários com feedback visual (Zod + React Hook Form)
- ✅ Responsividade mobile-friendly (menu hamburguer + cards no mobile)
- ✅ Docker + Docker Compose
- ✅ TypeScript no React

---

## 📡 Endpoints da API

### Autenticação
| Método | Endpoint        | Descrição      |
|--------|-----------------|----------------|
| POST   | /api/v1/login   | Login          |
| POST   | /api/v1/logout  | Logout         |
| GET    | /api/v1/me      | Usuário logado |

### Motoristas
| Método | Endpoint                            | Descrição          |
|--------|-------------------------------------|--------------------|
| GET    | /api/v1/drivers                     | Listar motoristas  |
| POST   | /api/v1/drivers                     | Criar motorista    |
| PUT    | /api/v1/drivers/{id}                | Editar motorista   |
| PATCH  | /api/v1/drivers/{id}/toggle-active  | Inativar/ativar    |

### Ordens de Transporte
| Método | Endpoint                               | Descrição        |
|--------|----------------------------------------|------------------|
| GET    | /api/v1/transport-orders               | Listar ordens    |
| POST   | /api/v1/transport-orders               | Criar ordem      |
| PUT    | /api/v1/transport-orders/{id}          | Editar ordem     |
| PATCH  | /api/v1/transport-orders/{id}/advance  | Avançar status   |
| DELETE | /api/v1/transport-orders/{id}          | Excluir ordem    |
| GET    | /api/v1/dashboard                      | Dados dashboard  |