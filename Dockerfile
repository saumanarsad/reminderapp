version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: reminder_app
    ports:
      - "8000:9000"
    volumes:
      - .:/var/www/html
    depends_on:
      - db
    environment:
      DB_CONNECTION: mysql
      DB_HOST: db
      DB_PORT: 3306
      DB_DATABASE: reminder_app
      DB_USERNAME: reminder_user
      DB_PASSWORD: root

  db:
    image: mysql:8.0
    container_name: reminder_db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: reminder_app
      MYSQL_USER: reminder_user
      MYSQL_PASSWORD: root
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
