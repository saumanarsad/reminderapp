#!/bin/bash

# Setup script for Laravel Reminder App

echo "🚀 Setting up Laravel Reminder App..."

# Build and start Docker containers
echo "📦 Building Docker containers..."
docker-compose up -d --build

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Install PHP dependencies
echo "📥 Installing PHP dependencies..."
docker-compose exec -T app composer install

# Install Node dependencies
echo "📥 Installing Node dependencies..."
docker-compose exec -T app npm install

# Build frontend assets
echo "🔨 Building frontend assets..."
docker-compose exec -T app npm run build

# Generate application key
echo "🔑 Generating application key..."
docker-compose exec -T app php artisan key:generate

# Run database migrations
echo "🗄️  Running database migrations..."
docker-compose exec -T app php artisan migrate --force

# Seed database
echo "🌱 Seeding database..."
docker-compose exec -T app php artisan db:seed --force

echo "✅ Setup complete!"
echo ""
echo "🌐 Application is available at: http://localhost:8000"
echo "📧 Demo credentials:"
echo "   Email: test@example.com"
echo "   Password: password"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop containers: docker-compose down"

