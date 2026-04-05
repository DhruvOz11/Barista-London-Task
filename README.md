# 📋 Task Management Application

A full-stack task management application built with React, Node.js, Express, and MongoDB. Users can create, read, update, and delete tasks with secure JWT authentication.

## ✨ Features

- 🔐 **User Authentication**: Secure signup and login with JWT tokens
- 📝 **Task Management**: Create, view, edit, and delete tasks
- 🎯 **Task Status Tracking**: Track tasks with three status levels (Pending, In Progress, Completed)
- 🔍 **Task Filtering**: Filter tasks by status on the dashboard
- 🎨 **Modern UI**: Clean, responsive interface built with Tailwind CSS
- 🚀 **Fast Development**: Built with Vite for rapid development and hot reloading
- 🛡️ **Security**: Password hashing with bcrypt and JWT authentication
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key-here
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS (if installed via Homebrew)
brew services start mongodb/brew/mongodb-community

# On Windows (if installed as service)
net start MongoDB

# Or run manually
mongod
```

## 🎯 Usage

### Development Mode

1. **Start the Backend Server**:

   ```bash
   cd backend
   npm start
   ```

   The backend will run on `http://localhost:3000`

2. **Start the Frontend Development Server**:

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

### Production Build

1. **Build the Frontend**:

   ```bash
   cd frontend
   npm run build
   ```

2. **Start the Backend**:
   ```bash
   cd backend
   npm start
   ```

## 📖 API Documentation

### Authentication Endpoints

#### POST `/user/signup`

Create a new user account.

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User created successfully"
}
```

#### POST `/user/login`

Authenticate user and receive JWT token.

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Task Endpoints

All task endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

#### GET `/task`

Get all tasks for the authenticated user.

**Response:**

```json
{
  "success": true,
  "tasks": [
    {
      "_id": "60d5ecb74bbb4c001f8b4567",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API docs",
      "status": "in-progress",
      "user": "60d5ecb74bbb4c001f8b4568",
      "createdAt": "2023-06-25T10:30:00.000Z",
      "updatedAt": "2023-06-25T10:30:00.000Z"
    }
  ]
}
```

#### GET `/task/:id`

Get a specific task by ID.

**Response:**

```json
{
  "success": true,
  "task": {
    "_id": "60d5ecb74bbb4c001f8b4567",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "in-progress",
    "user": "60d5ecb74bbb4c001f8b4568",
    "createdAt": "2023-06-25T10:30:00.000Z",
    "updatedAt": "2023-06-25T10:30:00.000Z"
  }
}
```

#### POST `/task`

Create a new task.

**Request Body:**

```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "pending"
}
```

**Response:**

```json
{
  "success": true,
  "newTask": {
    "_id": "60d5ecb74bbb4c001f8b4569",
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "user": "60d5ecb74bbb4c001f8b4568",
    "createdAt": "2023-06-25T10:35:00.000Z",
    "updatedAt": "2023-06-25T10:35:00.000Z"
  }
}
```

#### PUT `/task/:id`

Update an existing task.

**Request Body:**

```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "completed"
}
```

**Response:**

```json
{
  "success": true,
  "task": {
    "_id": "60d5ecb74bbb4c001f8b4567",
    "title": "Updated Task Title",
    "description": "Updated description",
    "status": "completed",
    "user": "60d5ecb74bbb4c001f8b4568",
    "createdAt": "2023-06-25T10:30:00.000Z",
    "updatedAt": "2023-06-25T10:40:00.000Z"
  }
}
```

#### DELETE `/task/:id`

Delete a task.

**Response:**

```json
{
  "success": true,
  "message": "Task deleted"
}
```

## 📁 Project Structure

```
task-management-app/
├── backend/
│   ├── app.js                 # Main Express application
│   ├── package.json           # Backend dependencies and scripts
│   ├── controllers/
│   │   ├── user.js           # User authentication logic
│   │   └── task.js           # Task CRUD operations
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── models/
│   │   ├── user.js           # User MongoDB schema
│   │   └── task.js           # Task MongoDB schema
│   └── routes/
│       ├── user.js           # Authentication routes
│       └── task.js           # Task management routes
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── App.jsx           # Main React application
│   │   ├── main.jsx          # React entry point
│   │   ├── index.css         # Global styles
│   │   ├── components/
│   │   │   ├── Form.jsx      # Reusable form modal
│   │   │   ├── Input.jsx     # Reusable input component
│   │   │   ├── Select.jsx    # Reusable select component
│   │   │   ├── TaskCard.jsx  # Task display component
│   │   │   └── Navbar.jsx    # Navigation component
│   │   ├── hooks/
│   │   │   └── useAuth.jsx   # Authentication hook
│   │   └── pages/
│   │       ├── Login.jsx     # Login page
│   │       ├── Signup.jsx    # Signup page
│   │       ├── Dashboard.jsx # Main dashboard
│   │       ├── CreateTask.jsx # Task creation page
│   │       └── EditTask.jsx   # Task editing page
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── eslint.config.js      # ESLint configuration
│   └── README.md             # This file
└── .gitignore
```

## 🔧 Available Scripts

### Backend Scripts

```bash
cd backend
npm start    # Start the development server with nodemon
```

### Frontend Scripts

```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔒 Security Features

- **Password Hashing**: User passwords are hashed using bcryptjs with 10 salt rounds
- **JWT Authentication**: Secure token-based authentication with 1-hour expiration
- **User Isolation**: Users can only access their own tasks
- **Input Validation**: Both frontend and backend validation
- **CORS Protection**: Configured to only allow requests from the frontend origin
- **Environment Variables**: Sensitive data stored securely in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help, please open an issue on GitHub.

## 🚀 Future Enhancements

- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Task sharing and collaboration
- [ ] File attachments
- [ ] Task comments and discussions
- [ ] Dark mode theme
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Task templates
- [ ] Advanced filtering and search
- [ ] Data export/import
- [ ] User profile management
- [ ] Task statistics and analytics

---

**Made with ❤️ using React, Node.js, and MongoDB**
