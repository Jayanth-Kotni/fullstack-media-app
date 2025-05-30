# 📁 Media Vault

Media Vault is a full-stack media management application that allows authenticated users to securely upload, view, and manage images, videos, audio files, and PDFs. It features powerful search, tag filtering, JWT authentication, Cloudinary integration, and a responsive UI.

---

## 🚀 Features

- ✅ User Authentication (Register, Login, JWT-based session)
- 📤 Upload media files to Cloudinary
- 🖼️ View image, video, audio, and PDF files in a popup modal
- 👁️ Track and display view count
- 🔎 Search media by tags
- 🎯 Filter by file type (image, video, audio, PDF)
- 🗑️ Delete media with undo functionality
- 🔐 Secure routes via protected frontend and backend logic
- 📱 Responsive UI built with React

---

## 🛠 Tech Stack

| Layer       | Technology                |
|-------------|---------------------------|
| Frontend    | React, CSS, Font Awesome  |
| Backend     | Node.js, Express.js       |
| Database    | MongoDB with Mongoose     |
| Auth        | JSON Web Tokens (JWT)     |
| File Storage| Cloudinary                |
| API Docs    | Swagger                   |

---

## 📂 Folder Structure

```
media-vault/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── app.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│
├── .env
├── README.md
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory with:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🔐 Authentication Flow

1. User registers with name, email, and password.
2. Login returns a JWT token.
3. Token is stored in localStorage and attached to all protected API requests via `Authorization: Bearer <token>`.
4. Private routes are guarded on both frontend and backend.

---

## 🧪 API Endpoints

### Auth Routes

| Method | Endpoint              | Description           |
|--------|----------------------|-----------------------|
| POST   | /api/auth/register   | Register a new user   |
| POST   | /api/auth/login      | Login and get JWT     |

### Media Routes

| Method | Endpoint                | Description                |
|--------|------------------------ |----------------------------|
| GET    | /api/files/search       | Get/search all media       |
| POST   | /api/upload             | Upload a media file        |
| POST   | /api/upload/view/:id    | Increment file view count  |
| DELETE | /api/upload/:id         | Delete a media file        |

> **Note:** All media routes require JWT in the Authorization header.

---

## 📖 API Documentation

Interactive API docs are available via Swagger.  
After starting the backend server, visit:

[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🖥️ Frontend Pages

| Route        | Description                  |
|--------------|-----------------------------|
| /register    | User registration form       |
| /login       | Login page                   |
| /dashboard   | Media management dashboard   |
| *            | Redirects to /login          |

---

## 🧭 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Jayanth-Kotni/fullstack-media-app.git
cd fullstack-media-app
```

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```
Make sure your `.env` file is configured correctly.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```
