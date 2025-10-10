# 🧩 PHP + Angular Monorepo

This repository contains a full-stack web application using:

- **Backend:** PHP (e.g. Laravel or custom REST API)
- **Frontend:** Angular
- **Structure:** Monorepo – both backend and frontend are managed in one repository.

---

## 📁 Project Structure

```
project-root/
│
├── backend/                # PHP backend (Laravel or custom API)
│   ├── app/
│   ├── public/
│   ├── routes/
│   ├── vendor/
│   └── composer.json
│
├── frontend/               # Angular frontend
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/abed-961/MarryTime.git
cd MarryTime
```

---

## 🧠 Backend Setup (PHP)

Navigate to the backend folder:

```bash
cd backend
```

### Install dependencies:
```bash
composer install
```

### Configure environment:
Copy `.env.example` to `.env` and set up your database, app URL, etc.

```bash
cp .env.example .env
php artisan key:generate
```

### Run migrations (if applicable):
```bash
php artisan migrate
```

### Start the backend server:
```bash
php artisan serve --host=localhost  --port=8000
```

Your API will be available at:
```
http://localhost:8000
```

---

## 💻 Frontend Setup (Angular)

Open a new terminal and go to the frontend folder:

```bash
cd frontend
```

### Install dependencies:
```bash
npm install
```

### Update the environment file (if needed):
Edit `src/environments/environment.ts` to match your backend API URL:

```ts
export const api  = {
  production: false,
  url : 'http://localhost:8000'
};
```

### (Optional) Setup a proxy to avoid CORS:
Create `proxy.conf.json`:

```json
{
  "/api": {
    "target": "http://localhost:8000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

Then in `package.json`, update the start script:
```json
"start": "ng serve"
```
Frontend runs at:
```
http://localhost:4200
```

API calls are proxied automatically to the PHP backend.

---

## 🚀 Build for Production

### Build Angular app:
```bash
ng build
```

The output will be generated in:
```
frontend/dist/frontend/
```

To serve the frontend via PHP, copy the build files into the backend’s public directory:

```bash
cp -r frontend/dist/frontend/* backend/public/
```

Now the backend serves both the frontend and API together from one server.

---

## 🧩 Common Commands

| Task | Command |
|------|----------|
| Run backend | `php artisan serve` |
| Run frontend | `ng serve ` |
| Build frontend | `ng build --prod` |
| Install PHP deps | `composer install` |
| Install Node deps | `npm install` |
| Migrate DB | `php artisan migrate` |

---

## 🧱 Notes

- Keep API endpoints under `/api` in your backend.
- Use Angular environments to manage base URLs for dev and prod.
- You can deploy both apps from the backend’s `/public` directory for simplicity.

---

## 📜 License

This project is open source under the [MIT License](LICENSE).

---

## ✨ Author

Developed by **Abdallah Taha**  
📧 Contact: abdallahkhoder59@gmail.com 
