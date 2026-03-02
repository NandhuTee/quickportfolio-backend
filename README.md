# 🚀 QuickPortfolio Backend

- A custom-built backend system that powers QuickPortfolio — One-Click Portfolio Builder.

- This API allows developers to create and manage structured professional portfolios including projects, experience, and social links.

## Tech Stack

- Node.js

- Express.js

- PostgreSQL

- Prisma ORM

- JWT Authentication

- bcrypt (password hashing)

- Render (deployment)

## 📁 Project Structure
src/
  controllers/
  routes/
  middleware/
  prisma/
  server.js

## Clean architecture:

- Controllers → Business logic

- Routes → API endpoints

- Middleware → Authentication

- Prisma → Database schema & migrations

## 🔐 Authentication

- Secure password hashing using bcrypt

- JWT-based authentication

- Protected routes using middleware

## 🧾 Database Schema

### Relationships:

- User → One Portfolio

- Portfolio → Many Projects

- Portfolio → Many Experiences

- Portfolio → Many Social Links

## 📌 API Endpoints
- **Auth**
POST /auth/register
POST /auth/login
- **Portfolio** 
POST /portfolio
GET /portfolio/:userId
PUT /portfolio
DELETE /portfolio
- **Projects** 
POST /projects
GET /projects
DELETE /projects/:id
- **Experience**
POST /experience
GET /experience
DELETE /experience/:id
- **Social Links**
POST /links
GET /links
DELETE /links/:id

## 🌍 Live Deployment

- Backend deployed on Render:

https://quickportfolio-backend.onrender.com

## 🧠 Why Custom Backend?

- Instead of using auto-generated APIs (e.g., Supabase auto REST), this backend was built from scratch to:

- Fully control authentication

- Design relational models manually

- Implement business logic explicitly

- Practice real-world backend architecture

## 🚀 How to Run Locally
```nodejs
npm install
npx prisma migrate dev
node src/server.js
```
- Now commit:

```git 
git add README.md
git commit -m "Add professional README"
git push
```