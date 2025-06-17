# MERN To‑Do App

A full-stack **To‑Do List Application** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) that allows users to register, log in, and manage their personal tasks securely with JWT authentication.

---

## 🚀 Features

- User Registration & Login with JWT
- Protected Routes via Middleware
- Task CRUD Operations (Create, Read, Update, Delete)
- Clean UI built using React
- RESTful API integration via Axios
- MongoDB for persistent storage

---

## 📁 Project Structure

```
mern-to-do-app/
├── client/             # Frontend (React)
│   ├── public/         # HTML & manifest
│   └── src/            # React source code
│       ├── components/ # Protected route components
│       ├── pages/      # Login, Register, Todo pages
│       └── services/   # Axios API wrapper
├── server/             # Backend (Express + MongoDB)
│   ├── middleware/     # JWT Auth middleware
│   ├── models/         # User and Task schemas
│   └── routes/         # Auth and Task routes
```

---

## 🛠 Tech Stack

**Frontend**
- React.js
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Token)

---

## 🛠️ Getting Started

Follow these steps to run the project on your local machine:

### 1. Fork and Clone the Repository

- Fork this repository: [sanketkanse999/mern-to-do-app](https://github.com/sanketkanse999/mern-to-do-app)
- Open your terminal and run:

```bash
git clone https://github.com/YOUR-USERNAME/mern-to-do-app.git
```

> Replace `YOUR-USERNAME` with your GitHub username.

---

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd mern-to-do-app/client
npm install

# Install backend dependencies
cd ../server
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the `server/` directory with the following content:

```ini
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8000
```

> Replace `your_mongo_connection_string` and `your_jwt_secret_key` with your own values.

---

### 4. Run the Project Locally

#### Start the Backend:

```bash
cd mern-to-do-app/server
npm run dev
```

#### Start the Frontend:

```bash
cd mern-to-do-app/client
npm start
```

---

## 📬 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---


