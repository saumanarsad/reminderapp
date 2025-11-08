# Laravel Reminder App

A Dockerized Laravel 12 reminder web application using Inertia.js, React, and TypeScript with MySQL and browser notifications.

## Features

* User authentication (login, register, logout)
* CRUD operations for reminders
* Browser notifications for due reminders
* Clean, responsive UI using Tailwind CSS
* TypeScript support for type safety
* Fully Dockerized for easy deployment

---

## Tech Stack

* **Backend:** Laravel 12 (PHP 8.3+)
* **Frontend:** Inertia.js + React + TypeScript + Tailwind CSS
* **Database:** MySQL 8.0
* **Containerization:** Docker + Docker Compose

---

## Prerequisites

* Docker & Docker Compose installed
* Git

---

## Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd reminder-app
```

2. **Build and start Docker containers:**

```bash
docker-compose up -d --build
```

3. **Install PHP dependencies (if needed):**

```bash
docker-compose exec app composer install
```

4. **Install Node dependencies (if needed):**

```bash
docker-compose exec app npm install
```

5. **Build frontend assets:**

```bash
docker-compose exec app npm run build
```

6. **Generate application key:**

```bash
docker-compose exec app php artisan key:generate
```

7. **Run database migrations:**

```bash
docker-compose exec app php artisan migrate
```

8. **Seed the database (optional):**

```bash
docker-compose exec app php artisan db:seed
```

---

## Usage

1. Access the application at: `http://localhost:8000`

2. **Demo Credentials (if seeded):**

   * Email: `test@example.com`
   * Password: `password`

3. **Create a Reminder:**

   * Click **Add reminder**
   * Fill in title, optional description, and due date/time
   * For testing notifications, set a reminder 1–2 minutes in the future

4. **Browser Notifications:**

   * The app will request notification permission on first load
   * Notifications trigger when reminders are due (within a 1-minute window)
   * Make sure to allow notifications in your browser

---

## Development

### Running Laravel & Node Commands

Run all commands inside the Docker container:

```bash
docker-compose exec app php artisan <command>
docker-compose exec app npm <command>
```

### Rebuilding Assets

* After frontend changes:

```bash
docker-compose exec app npm run build
```

* For development with hot reload:

```bash
docker-compose exec app npm run dev
```

### Database Access

MySQL is accessible on port 3306:

* Host: `localhost`
* Port: `3306`
* Database: `reminder_app`
* Username: `reminder_user`
* Password: `root`

---

## Project Structure

```
├── app/
│   ├── Http/Controllers/
│   │   ├── AuthController.php
│   │   └── ReminderController.php
│   ├── Middleware/HandleInertiaRequests.php
│   └── Models/
│       ├── Reminder.php
│       └── User.php
├── database/
│   ├── migrations/
│   └── seeders/ReminderSeeder.php
├── resources/
│   ├── js/
│   │   ├── Pages/
│   │   │   ├── Auth/Login.tsx
│   │   │   ├── Auth/Register.tsx
│   │   │   ├── Reminders/Index.tsx
│   │   │   ├── Reminders/Create.tsx
│   │   │   ├── Reminders/Edit.tsx
│   │   │   └── Layout.tsx
│   │   ├── types/index.ts
│   │   └── app.tsx
│   └── views/app.blade.php
├── routes/web.php
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Testing Notifications

1. Log in to the application
2. Create a reminder 1–2 minutes in the future
3. Allow browser notifications when prompted
4. Wait for the notification

---

## Troubleshooting

### Port Already in Use

Modify the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "8000:80" 
```

### Database Connection Issues

Check if the database container is running:

```bash
docker-compose ps
```

If not, start it:

```bash
docker-compose up -d db
```

> Make sure your `.env` has the correct DB host for Docker:

```env
DB_HOST=db
DB_PORT=3306
```

### Permission Issues

```bash
docker-compose exec app chown -R www-data:www-data /var/www/html/storage
docker-compose exec app chmod -R 755 /var/www/html/storage
```

---

## License

This project is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## Quick Start (All-in-One)

```bash
./setup.sh
# OR manually:
docker-compose up -d --build
docker-compose exec app composer install
docker-compose exec app npm install
docker-compose exec app npm run build
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate --force
docker-compose exec app php artisan db:seed --force
```

Access: `http://localhost:8000`
Demo Credentials: Email: `test@example.com` | Password: `password`
