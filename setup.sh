#!/bin/bash

# Script para configurar o ambiente completo do projeto Laravel + React com Docker
# Uso: ./setup.sh

echo "🔧 Iniciando configuração do ambiente..."

# Copiar arquivos de exemplo
cp .env.example .env
cp frontend/.env.example frontend/.env

# Subir os containers Docker
echo "🐳 Subindo containers Docker..."
docker compose up -d --build

# Instalar dependências do Laravel
echo "📦 Instalando dependências PHP..."
docker compose exec app composer install

# Gerar chave da aplicação
php_container="$(docker compose ps -q app)"
docker exec "$php_container" php artisan key:generate

# Executar migrations e seeders
echo "📂 Rodando migrations e seeders..."
docker exec "$php_container" php artisan migrate --seed

# Instalar dependências do React
echo "📦 Instalando dependências do front-end..."
docker compose exec frontend npm install

# Construir front-end (modo dev)
echo "🧱 Rodando front-end em modo desenvolvimento..."
docker compose exec frontend npm run dev

# Executar testes
echo "🧪 Rodando testes..."
docker compose exec app ./vendor/bin/pest

# Finalizado
echo "✅ Ambiente configurado com sucesso! Acesse em http://localhost:5173"
