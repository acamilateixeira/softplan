# 🍰 Cake App

Sistema completo para gestão de bolos, desenvolvido com:

- **Laravel** (API back-end)
- **React + MUI** (front-end)
- **Docker** (ambiente padronizado)

Inclui:
- Cadastro de bolos com interessados (e-mails)
- Lista interativa com edição e exclusão
- Envio de e-mail com fila (queue)
- Dashboard com gráficos de resumo
- Tema escuro/claro, responsividade e notificacões com Snackbar

---

## ⚙️ Requisitos

- Docker + Docker Compose

---

## 📂 Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/cake-app.git
cd cake-app
```

### 2. Rode o script de instalação
O projeto possui um script `setup.sh` que sobe o ambiente e prepara tudo:

```bash
chmod +x setup.sh
./setup.sh
```

Esse script realiza:
- Build e up dos containers (backend, frontend, banco de dados)
- Instala dependências do Laravel
- Roda as migrations e seeders
- Instala dependências do front

**Aguarde o processo finalizar, ele prepara tudo automaticamente.**

---

## 🚀 Acessos

| Serviço     | URL                     |
|-------------|-------------------------|
| Front-end   | http://localhost:5173   |
| API         | http://localhost/api    |
| Ping API    | http://localhost/api/ping |

---

## 💰 Credenciais do banco
A aplicação já vem com um banco MySQL no Docker configurado via `.env`. 

Caso queira acessar manualmente:

- Host: `127.0.0.1`
- Porta: `3306`
- Usuário: `phper`
- Senha: `secret`
- Banco: `laravel`

---

## ✉️ E-mails e fila

- O envio de e-mails é simulado com [Mailtrap](https://mailtrap.io), já configurado no `.env`
- O Laravel usa **fila database** para envio assíncrono
- As jobs são processadas automaticamente pelo container `queue`

---

## 📈 Dashboard

Acesse `/summary` no front para ver o gráfico com:
- Quantidade total de bolos
- Quantidade total disponível
- Gráfico por tipo de bolo e número de interessados

---

## 📖 Estrutura do projeto

```
/cake-app
├── backend/           # Laravel API
│   ├── app/
│   ├── database/
│   └── ...
├── frontend/          # React + MUI
│   ├── src/
│   ├── public/
│   └── ...
├── docker/
│   ├── php/
│   ├── nginx/
│   └── ...
├── docker-compose.yml
└── setup.sh           # Script de preparação
```

---

## 🚫 Problemas comuns

### Front com erro de import
> Certifique-se de que está usando `./contexts/SnackbarContext` e não `hooks`

### Backend com erro de conexão no banco
> Rode `docker compose restart` após o setup caso o banco demore a subir

---

## 📝 Testes

Back-end:
```bash
docker compose exec app ./vendor/bin/pest
```

---

- Configure `.env` com credenciais reais de SMTP e banco
- Rode `php artisan config:cache && php artisan migrate --force`

---

Feito com amor e fome de bolo ❤️

Camila Teixeira
