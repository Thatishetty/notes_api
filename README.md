
# 📝 Notes API with User Authentication

A RESTful Notes API built using **Express.js**, **MySQL**, **JWT Authentication**, and **bcryptjs**. Each user can register, log in, and manage their personal notes securely.

---

## 📁 Features

- 🔐 User Registration & Login (with hashed passwords)
- ✅ JWT-based Authentication
- 🗒️ CRUD operations on Notes
- 🔒 Notes are user-specific (only the creator can see/edit/delete them)
- 📬 Tested using Postman

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT + bcryptjs
- **ORM**: mysql2 (promise-based)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/notes-api.git
cd notes-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=note
PORT=3000
JWT_SECRET=your_jwt_secret
```

### 4. Set up MySQL Database

Run the following SQL to create the necessary tables:

```sql
CREATE DATABASE IF NOT EXISTS note;

USE note;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  pass VARCHAR(255) NOT NULL
);

CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 5. Start the Server

```bash
npx nodemon server.js
```

Server should run on `http://localhost:3000`

---

## 📬 API Endpoints (Test using Postman)

### 🔑 User Routes

| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| POST   | `/api/users/register`| Register new user    |
| POST   | `/api/users/login`   | Log in & get token   |

**Sample Request Body:**

```json
{
  "userName": "aakash",
  "email": "aakash@example.com",
  "pass": "123456"
}
```

---

### 📓 Note Routes (Protected)

⚠️ Add the token in `Authorization` header as `Bearer <your_token>`

| Method | Endpoint             | Description         |
|--------|----------------------|---------------------|
| GET    | `/api/notes`         | Get all user notes  |
| GET    | `/api/notes/:id`     | Get specific note   |
| POST   | `/api/notes`         | Create new note     |
| PUT    | `/api/notes/:id`     | Update note         |
| DELETE | `/api/notes/:id`     | Delete note         |

---

## ✅ Example Postman Usage

1. Register new user
2. Log in and copy token from response
3. Use token in Authorization header as:
   ```
   Bearer eyJhbGciOiJI...
   ```
4. Perform note operations (CRUD)

---

## 🙋‍♂️ Author

**Thatishetty Aakash Chandra**

---

## 📄 License

This project is licensed under the MIT License.
