Fullstack Blog Application
Overview
This is a full-stack blog application built with React, Node.js, Express, and MongoDB. It allows users to register, login, create, edit, delete, and browse blog posts with a modern, responsive UI.
The project demonstrates: - Full authentication flow with JWT - Secure backend APIs - CRUD operations - Pagination & search - Modern UI using Tailwind CSS - Skeleton loaders and animations

Tech Stack
Frontend
React.js
React Router
Axios
Tailwind CSS
React Toastify
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
bcrypt.js

Features
Authentication
User registration
User login
JWT-based authentication
Protected routes
Persistent login using localStorage
Blog Features
Create new posts
Edit existing posts (owner only)
Delete posts (owner only)
View all posts
View single post details
Pagination
Search by title or author
UI/UX
Responsive design
Skeleton loaders
Toast notifications
Dashboard-style UI
Hover animations
Industry-grade layouts

Folder Structure
Client
client/
  ├── src/
  │   ├── components/
  │   ├── context/
  │   ├── pages/
  │   ├── App.js
  │   └── index.js
Server
server/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── config/
  └── index.js

Environment Variables
Create a .env file inside the server folder:

PORT=5000
MONGO_URI=mongodb+srv://admin:4TG1HEjDA4vWVPyi@cluster0.ki7hfz9.mongodb.net/?appName=Cluster0

JWT_SECRET=652afd845ee4761c89d5936dca06b124c1bec19e024da5a53027b2599eea9479

API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
Posts
GET /api/posts
GET /api/posts/:id
POST /api/posts (Protected)
PUT /api/posts/:id (Protected)
DELETE /api/posts/:id (Protected)

How to Run Locally

Backend
cd server
npm install
npm run dev



Frontend
cd client
npm install
npm start


Demo Credentials:

Email: vikas2gmail.com  
Password: 123456



Author
Developed by Vikas
