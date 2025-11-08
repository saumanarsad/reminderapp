# Laravel Reminder App

A Dockerized Laravel 12 reminder web application using Inertia.js with React and TypeScript, MySQL, and browser notifications.

## Features

- User authentication (login, register, logout)
- CRUD operations for reminders
- Browser notifications when reminders are due
- Clean, responsive UI with Tailwind CSS
- TypeScript for type safety
- Dockerized for easy deployment

## Tech Stack

- **Backend**: Laravel 12 (PHP 8.3+)
- **Frontend**: Inertia.js + React + TypeScript + Tailwind CSS
- **Database**: MySQL 8.0
- **Containerization**: Docker + Docker Compose

## Prerequisites

- Docker and Docker Compose installed
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd reminder-app
```

2. Build and start the Docker containers:
```bash
docker-compose up -d --build
```

3. Install PHP dependencies (if needed):
```bash
docker-compose exec app composer install
```

4. Install Node dependencies (if needed):
```bash
docker-compose exec app npm install
```

5. Build frontend assets:
```bash
docker-compose exec app npm run build
```

6. Generate application key:
```bash
docker-compose exec app php artisan key:generate
```

7. Run database migrations:
```bash
docker-compose exec app php artisan migrate
```

8. Seed the database (optional):
```bash
docker-compose exec app php artisan db:seed
```

## Usage

1. Access the application at: `http://localhost:8000`

2. **Demo Credentials** (if seeded):
   - Email: `test@example.com`
   - Password: `password`

3. **Create a Reminder**:
   - Click "Add reminder"
   - Fill in the title, description (optional), and due date/time
   - For testing notifications, set a reminder 1-2 minutes in the future

4. **Browser Notifications**:
   - The app will request notification permission on first load
   - Notifications will trigger when reminders are due (within 1 minute window)
   - Make sure to allow notifications in your browser

## Development

### Running Commands

All Laravel commands should be run inside the Docker container:

```bash
docker-compose exec app php artisan <command>
docker-compose exec app npm <command>
```

### Rebuilding Assets

After making frontend changes:

```bash
docker-compose exec app npm run build
```

Or for development with hot reload:

```bash
docker-compose exec app npm run dev
```

### Database Access

MySQL is accessible on port 3306:
- Host: `localhost`
- Port: `3306`
- Database: `reminder_app`
- Username: `reminder_user`
- Password: `root`

## Project Structure

```
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   └── ReminderController.php
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php
│   └── Models/
│       ├── Reminder.php
│       └── User.php
├── database/
│   ├── migrations/
│   └── seeders/
│       └── ReminderSeeder.php
├── resources/
│   ├── js/
│   │   ├── Pages/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   ├── Reminders/
│   │   │   │   ├── Index.tsx
│   │   │   │   ├── Create.tsx
│   │   │   │   └── Edit.tsx
│   │   │   └── Layout.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── app.tsx
│   └── views/
│       └── app.blade.php
├── routes/
│   └── web.php
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Testing Notifications

1. Log in to the application
2. Create a reminder with a due date 1-2 minutes in the future
3. Allow browser notifications when prompted
4. Wait for the reminder to be due
5. You should receive a browser notification

## Troubleshooting

### Port Already in Use

If port 8000 is already in use, modify the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "8001:80"  # Change 8000 to 8001
```

### Database Connection Issues

Ensure the database service is running:

```bash
docker-compose ps
```

If the database container is not running:

```bash
docker-compose up -d db
```

### Permission Issues

If you encounter permission issues:

```bash
docker-compose exec app chown -R www-data:www-data /var/www/html/storage
docker-compose exec app chmod -R 755 /var/www/html/storage
```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).



o Run the Application
Run the setup script:
./setup.sh
Or manually:
docker-compose up -d --builddocker-compose exec app composer installdocker-compose exec app npm installdocker-compose exec app npm run builddocker-compose exec app php artisan key:generatedocker-compose exec app php artisan migrate --forcedocker-compose exec app php artisan db:seed --force
Access the application at: http://localhost:8000
Demo credentials (if seeded):
Email: test@example.com
Password: password
The application is ready to use. All components are implemented and configured.# reminderapp
