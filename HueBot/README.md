# 🎨 HueBot

> **An intuitive colour palette generator built for designers, developers & creatives**

HueBot helps you generate stunning colour palettes using advanced colour theory algorithms. Save your favourite combinations and access them anytime!

---

## ✨ Features

### 🎨 **5 Colour Generation Algorithms**

- **Random** - Generate completely random colour combinations
- **Complementary** - Create harmonious opposing colours
- **Analogous** - Build palettes with adjacent hues
- **Monochromatic** - Explore variations of a single colour
- **Triadic** - Generate balanced three-colour schemes

### 📝 **Palette Management**

- Save your favourite palettes with custom names
- View all saved palettes in your personal collection
- Delete unwanted palettes with a single click

### 🚀 **Enhanced UX**

- **Spacebar shortcut** - Press spacebar to generate new palettes instantly
- **Click-to-copy** - Click any colour box to copy its hex code
- Real-time alert with toast notifications
- Smooth animations and transitions

### 🔐 **User Authentication**

- Secure JWT-based authentication
- Register and login to save your work
- Personalized palette collections

---

## 🛠️ Tech Stack

### **Frontend**

- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **CSS3** - Custom styling with CSS variables

### **Backend**

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modelling
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing

---

## 🪴 Colour Theory Algorithms

HueBot uses sophisticated colour theory to generate harmonious palettes:

- **HSL Colour Space** - All algorithms work in HSL for natural colour relationships
- **Golden Ratio** - Used for aesthetically pleasing hue distributions
- **Complementary Theory** - Colours opposite on the colour wheel
- **Analogous Theory** - Adjacent hues for cohesive palettes
- **Triadic Theory** - Evenly spaced colours for balance

---

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Palettes

- `GET /api/palettes` - Get all user palettes
- `POST /api/palettes` - Save new palette
- `DELETE /api/palettes/:id` - Delete palette

---

## 🤝 Contributing

Contributions are welcome! Please feel free to raise an issue and only submit a Pull Request when the issue is assigned.

---

## 👨‍💻 Author

**Anurag Adhikari**

- GitHub: [@anurag-adk](https://github.com/anurag-adk)

---

## 🙏 Acknowledgments

- Colour theory algorithms inspired by modern design tools
- Built with love for designers and developers
- Part of Hacktoberfest 2025

---
