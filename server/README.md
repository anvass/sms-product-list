# Backend Server

## Настройка

Установка зависимостей:

```bash
npm install
```

## Docker

Запуск сервера и базы данных:

1. Сборка и запуск контейнеров:

   ```bash
   docker-compose up --build
   ```
2. Бэкэнд будет доступен по адресу http://localhost:3100, а база данных — по адресу localhost:5432.
3. Изменения в файлах автоматически перезагрузят сервер.
4. Для остановки и удаления контейнеров:

   ```bash
    docker-compose down
   ```

## API Endpoints

- `GET /products?page=1&limit=10` — список товаров с пагинацией
- `POST /products` — создание нового товара
- `PUT /products/:id` — обновление товара
- `DELETE /products/:id` — удаление товара
