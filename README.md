# Todo Application

A robust full-stack Todo Application with modern features and comprehensive user management.

## Key Features

### **Authentication & User Management**
- **JWT Token-based Authentication**: Ensures secure and seamless login sessions.
- **User Signup and Login**: Includes validation for secure access.
- **Password Management**:
  - Change password functionality.
  - Forgot password with email recovery.
  - Reset password capability.
- **Local Storage Integration**: Persistent authentication state.

### **Task Management**
- Full CRUD operations for todos.
- **Task Tracking**: Mark tasks as completed or pending.
- **Priority Settings**: Organize tasks by priority.
- Input validations to prevent errors.

### **Technical Features**
- **State Management**: Powered by Redux for predictable and scalable state.
- **Theme Toggle**: Switch between Dark and Light modes.
- **Responsive Design**: Fully optimized for mobile and desktop users.
- **Material-UI Components**: Sleek and modern user interface.
- **Redis Cache Integration**: Available in the [Redis-enabled branch](https://github.com/Ramosh99/OneBillionTech_ToDoApp/tree/cloneed).

### **Security**
- Protected routes to prevent unauthorized access.
- Input sanitization to mitigate vulnerabilities.
- Password hashing for secure data storage.
- JWT token verification for secure authentication.

### **Tech Stack**
- **Frontend**: React.js, Redux, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Caching**: Redis (available in the Redis-enabled branch)
- **Authentication**: JWT
- **Deployment and Hosting**: Vercel & Azure App Service

## Live Demo
Experience the application live here: [Todo App](https://one-billion-tech-to-do-app.vercel.app/)

## Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ramosh99/OneBillionTech_ToDoApp.git
   ```

2. **Setup Client**:
   ```bash
   cd client
   npm install
   npm start
   ```

3. **Setup Server**:
   ```bash
   cd server
   npm install
   npm start
   ```

4. **Redis Integration**:
   Switch to the [Redis-enabled branch](https://github.com/Ramosh99/OneBillionTech_ToDoApp/tree/cloneed) for caching:
   ```bash
   git checkout cloneed
   ```

## Happy Coding! 🚀