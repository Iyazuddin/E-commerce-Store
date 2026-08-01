# 🛒 E-Commerce Store

A full-stack E-Commerce web application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to browse products, manage their shopping cart, securely authenticate using JWT, and place orders through a clean and responsive interface.

---

## 🌐 Live Demo

**Application:** https://e-commerce-store-gk6j5sena-iyazuddins-projects.vercel.app/

**Backend API:** https://e-commerce-store-backend-gosj.onrender.com

---

## 📖 Project Overview

The MERN E-Commerce Store is a full-stack web application that demonstrates the implementation of a modern online shopping platform using the MERN Stack.

The project follows a client-server architecture where the React frontend communicates with an Express.js backend through REST APIs. MongoDB is used for storing users, products, and order data, while JWT is used for secure user authentication.

This project focuses on clean code organization, scalability, responsive UI, and maintainable project structure.

---

## ✨ Features

### User Features

- User Registration
- Secure User Login & Logout
- JWT Authentication
- View Product Details
- Add Products to Cart
- Update Cart Quantity
- Remove Products from Cart
- Place Orders
- View Order History
- Responsive User Interface

---

## 🛠 Tech Stack

### Frontend

- React.js
- React Router DOM
- Context API
- Axios
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

---

## 📁 Project Structure

```text
E-commerce-Store/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── README.md
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Iyazuddin/E-commerce-Store.git

cd E-commerce-Store
```

---

### 2. Install Dependencies

Install backend dependencies

```bash
cd server

npm install
```

Install frontend dependencies

```bash
cd ../client

npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the **server** folder.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

### 4. Run the Backend

```bash
cd server

npm start
```

or

```bash
npm run dev
```

---

### 5. Run the Frontend

```bash
cd client

npm run dev
```

---

### 6. Open the Application

```
http://localhost:5173
```

---

## 🔐 Environment Variables

The backend requires the following environment variables.

| Variable | Description |
|----------|-------------|
| PORT | Backend server port |
| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret key used for JWT authentication |
| CLIENT_URL | Frontend application URL |

> **Note:** Never commit your `.env` file to GitHub.

---

## 🌱 Database Seeding

To populate the database with sample data, run:

```bash
cd server

node seed.js
```

---

## 🔮 Future Improvements

- Product Search
- Product Filtering
- Category Management
- Wishlist
- Payment Gateway Integration
- Product Reviews
- Admin Dashboard
- User Profile Management
- Email Notifications
- Order Tracking
- Pagination
- Dark Mode

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Iyaz Uddin**

GitHub: https://github.com/Iyazuddin

---

⭐ If you found this project useful, consider giving it a **Star**.
