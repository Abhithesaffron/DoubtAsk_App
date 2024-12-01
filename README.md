
# **Deployed Full stack App link**

App link [https://doubtask.netlify.app/]

## *as its backend is deployed on free instace of render it will take approx one minute for first login , please have patience* 
---

# **Deployed Full stack App Demo video link**

video link [https://www.loom.com/share/fa37434fa94f4a79bde4d5c870e1fbe4?sid=6a971907-bba7-4115-b335-430e5f26e28c]

---

# **Admin-User Management System**

This project is a full-stack **Admin-User Management System** that implements secure authentication, role-based access control, and distinct dashboards for admins and users. The application supports token-based authorization, protected routes, and user-friendly error handling.

---

## **Key Features**

### **Frontend Features:**
1. **Role-Based Routing**:
   - Separate routes for Admin and User roles.
   - Protected routes restrict unauthorized access.
2. **Dynamic and Responsive Design**:
   - Fully responsive layouts using CSS.
3. **Authentication and Authorization**:
   - Login and signup pages for users and admins.
   - Token-based authentication using `localStorage`.
4. **Error Handling**:
   - Redirects to login/signup page upon unauthorized access or application errors.

### **Backend Features:**
1. **RESTful API**:
   - Built with Express.js.
   - Supports routes for authentication, user management, and data handling.
2. **Secure Authentication**:
   - Passwords are hashed using `bcrypt`.
   - JWT-based token generation and verification.
3. **Database Integration**:
   - MongoDB used to store user data, admin data, and session details.
4. **Error Handling and Logging**:
   - Centralized error middleware for consistent error responses.
   - Logs errors and significant events for debugging.
5. **Scalability**:
   - Modularized route and controller structure for maintainability.

---

## **Project Structure**

```
root
├── client                     // Frontend (React)
│   ├── src
│   │   ├── Context
│   │   │   ├── AdminContext.js   // Handles Admin state
│   │   ├── Homepage
│   │   │   ├── AdminPage
│   │   │   │   ├── AdminHomePage.js  // Admin Dashboard
│   │   │   ├── UserPage
│   │   │   │   ├── UserHomePage.js   // User Dashboard
│   │   ├── loginComponents
│   │   │   ├── StartingPage.js       // Entry Page
│   │   │   ├── LoginUser.js          // User Login
│   │   │   ├── LoginAdmin.js         // Admin Login
│   │   │   ├── SignupUser.js         // User Signup
│   │   ├── RouteProtection
│   │   │   ├── ProtectedRoute.js     // Protected Route Wrapper
│   ├── App.js                        // Main React App Component
│   ├── index.js                      // React Entry Point
│   ├── App.css                       // Global Styles
│   ├── .env                          // Environment Variables
├── server                     // Backend (Node.js + Express)
│   ├── controllers
│   │   ├── authController.js         // Handles login, signup, and token generation
│   │   ├── userController.js         // Manages user-related operations
│   ├── middleware
│   │   ├── authMiddleware.js         // Validates JWT tokens
│   │   ├── errorMiddleware.js        // Centralized Error Handler
│   ├── models
│   │   ├── User.js                   // Mongoose Schema for Users
│   │   ├── Admin.js                  // Mongoose Schema for Admins
│   ├── routes
│   │   ├── authRoutes.js             // Routes for login and signup
│   │   ├── adminRoutes.js            // Admin-specific routes
│   │   ├── userRoutes.js             // User-specific routes
│   ├── server.js                     // Main Server File
│   ├── config
│   │   ├── db.js                     // MongoDB Connection
├── README.md                  // Documentation
```

---

## **Setup Guide**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-repo-name.git
cd your-repo-name
```

### **2. Frontend Setup**
1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add the environment variable:
   Create a `.env` file and include:
   ```plaintext
   VITE_BASE_URL=http://localhost:5000
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

### **3. Backend Setup**
1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add environment variables:
   Create a `.env` file and include:
   ```plaintext
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   PORT=5000
   ```
4. Start the backend:
   ```bash
   npm test
   ```

### **4. Run the Application**
- Frontend: Open [(https://doubtask.netlify.app/)]([https://doubtask.netlify.app/]).
- Backend: Running at `https://doubtask-app.onrender.com`.

---

## **How to Use**

1. **Starting Page**: The application starts at `/` with login/signup options.
2. **Login and Signup**: Users and admins log in using their credentials. New users can sign up.
3. **Dashboards**:
   - **Admin**: Access admin-exclusive features via `/admin-home`.
   - **User**: Access user-specific content via `/user-home`.
4. **Protected Routes**: Unauthorized access redirects users to the login page.

---

## **Technology Stack**

### **Frontend**
- React.js
- React Router
- Context API
- CSS

### **Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcrypt (Password Hashing)

---

## **Future Enhancements**
- Implement pagination for user data.
- Add admin-specific analytics and reports.
- Integrate email/password recovery functionality.
- Expand user roles and permissions.

---

## **Contributing**
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m "Added new feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## **License**
This project is open-source .
