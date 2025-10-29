# 🍜 MERN Food Delivery App

A modern, full-stack food delivery web application built with the **MERN** stack (MongoDB, Express, React, Node.js), **Redux Toolkit** for state management, and **Tailwind CSS** for styling.



## Table of Contents

-   [Features](#-features)
-   [Tech Stack](#-tech-stack)
-   [Getting Started](#-getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
---

## ✨ Features

* **User Authentication:** Secure user registration and login (Sign Up/Login) using JWT (JSON Web Tokens).
* **Browse Restaurants:** View a list of available restaurants.
* **Restaurant Menus:** Select a restaurant to see its detailed menu.
* **Global Cart:** Add, remove, and update item quantities in a persistent cart.
* **State Management:** Efficient and predictable state management using **Redux Toolkit**.
* **Responsive Design:** Fully responsive and mobile-first UI built with **Tailwind CSS**.
* **Backend API:** A complete RESTful API built with Node.js and Express.

---

## 🚀 Tech Stack

### Frontend
* **React.js:** A JavaScript library for building user interfaces.
* **Redux Toolkit:** The official, opinionated, batteries-included toolset for efficient Redux development.
* **React Router:** For client-side routing and navigation.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Axios:** Promise-based HTTP client for making API requests.

### Backend
* **Node.js:** A JavaScript runtime built on Chrome's V8 engine.
* **Express.js:** A minimal and flexible Node.js web application framework.
* **MongoDB:** A NoSQL database for storing application data.
* **Mongoose:** An elegant MongoDB object modeling tool for Node.js.
* **JWT (JSON Web Token):** For secure user authentication.
* **Bcrypt.js:** For hashing user passwords.
* **`dotenv`:** For managing environment variables.

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You will need the following software installed on your computer:
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* `npm` or `yarn`
* [MongoDB](https://www.mongodb.com/try/download/community) (or a free MongoDB Atlas cluster)

### Installation

This guide assumes your project has a `frontend` and a `backend` folder in the root.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/P-a-n-k-a-j-7/MERN-projects-for-beginners.git
    cd your-project-folder
    ```

2.  **Set up the Backend:**
    ```sh
    # Install dependencies
    npm install

    # Create a .env file in the /backend folder
    touch .env
    ```
    Add the following environment variables to your `.env` file:
    ```.env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```
    * `MONGO_URI`: Your connection string from MongoDB Atlas or local MongoDB instance.
    * `JWT_SECRET`: A long, random string used for signing tokens.

    # Start the backend server (with nodemon for development)
    npm run dev
    ```

3.  **Set up the Frontend:**
    ```sh
    # Open a new terminal and navigate to the client directory
    cd client

    # Install dependencies
    npm install

    # Create a .env file (if you are using Vite)
    touch .env
    ```
    If your React app needs to know the backend URL, add it here (common with Vite):
    ```.env
    VITE_FIREBASE_API_KEY = your firebase api key here
    ```

    # Start the frontend development server
    npm run dev
    ```

You should now have the backend running on `http://localhost:3000` and the frontend running on `http://localhost:5173` (or 3000).

---

## 📁 Project Structure