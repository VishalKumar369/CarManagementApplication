# 🚗 Car Management Application

A full-stack application to manage cars where users can create, view, edit, and delete cars. Each car can contain up to 10 images, a title, a description, and tags like car type, company, dealer, etc. The application includes user authentication, product ownership, and search functionality.

## 🛠 Features
- **User Authentication**: Secure login and registration.
- **Car Management**: Users can create, update, delete, and view cars.
- **Image Upload**: Upload up to 10 car images per entry.
- **Tags**: Add car-related tags like type, company, and dealer.
- **Search Functionality**: Search cars by title, description, or tags.
- **User Authorization**: Users can manage only their own cars.

## 📋 Schema Design
### Car Schema
```javascript
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      validate: [arrayLimit, "You can only upload up to 10 tags."],
    },
    images: {
      type: [String],
      validate: [arrayLimit, "You can only upload up to 10 images."],
    },
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 10;
}

module.exports = mongoose.model("Car", carSchema);
```

## 💻 Tech Stack

- **Frontend** : React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Image Upload**: Multer (with file upload validation)

## 🚀 Installation

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/car-management-app.git
cd car-management-app
```

### 2. Install dependencies::

```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```

### 3. Environment variables: Create a .env file in the backend directory with the following variables:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/car_management
JWT_SECRET=your_jwt_secret
```

### 4. Run the application:

```bash
# Start the backend
cd backend
npm start

# Start the frontend
cd ../frontend
npm backend

```
### 4. Access the application: Visit http://localhost:5173 in your browser.

## 📖 API Documentation

For detailed API documentation, visit the [API Docs](https://drive.google.com/file/d/1qs3TidJ6LdMB-Lg3uS70deODKa2_lVJb/view?usp=sharing).

### Initial credentials for better experience
**Email**:- Vishal369mehta@gmail.com
**Password**:- 123456789

### ⚠️ Note
- Due to a **cold start**, the application may take some time to load during the first login or API call. Please wait a moment if you experience any delays.

