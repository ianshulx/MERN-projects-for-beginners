# 💰 Expense Tracker – MERN Stack

A beginner-friendly full-stack **Expense Tracker** application built with the **MERN** stack (MongoDB, Express.js, React, Node.js).

---

## 🚀 Features

- **User Authentication** – Register & Login with JWT-based auth
- **Add / Delete Expenses** – Track your daily spending
- **Expense Categories** – Organize expenses by category (Food, Transport, Bills, etc.)
- **Dashboard** – Visual summary of total income vs expenses
- **MongoDB Integration** – Persistent data storage with Mongoose ODM
- **RESTful API** – Clean, well-structured backend API

---

## 🛠️ Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Frontend   | React, React Router, Axios     |
| Backend    | Node.js, Express.js            |
| Database   | MongoDB (Mongoose)             |
| Auth       | JSON Web Tokens (JWT), bcrypt  |

---

## 📁 Folder Structure

```
Expense-Tracker-MERN/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── Expenses/
│   │   │   │   ├── AddExpense.jsx
│   │   │   │   └── ExpenseList.jsx
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── App.css
│   ├── package.json
│   └── .gitignore
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── expenseController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/selvaganapathycoder/MERN-projects-for-beginners.git
cd MERN-projects-for-beginners/Expense-Tracker-MERN
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

The React app will run on `http://localhost:3000` and the API on `http://localhost:5000`.

---

## 📡 API Endpoints

### Auth Routes

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Expense Routes (Protected)

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| GET    | `/api/expenses`       | Get all user expenses  |
| POST   | `/api/expenses`       | Add a new expense      |
| DELETE | `/api/expenses/:id`   | Delete an expense      |

---

## 📸 Screenshots

> _Add screenshots of your running application here._

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](../LICENSE).

---

## 👤 Author

**selvaganapathycoder**

- GitHub: [@selvaganapathycoder](https://github.com/selvaganapathycoder)
