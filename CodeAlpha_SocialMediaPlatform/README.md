# Connectify — Social Media Platform

A professional mini social media platform built for the CodeAlpha Full Stack Development internship.

## Features

- User registration and secure password hashing with bcrypt
- JWT authentication and protected API routes
- User profiles and editable bio/avatar
- Create and delete posts
- Like/unlike posts
- Add and view comments
- Follow/unfollow users
- Search users
- Personalized authenticated feed
- Responsive modern UI
- Light/dark theme
- MongoDB persistence

## Tech Stack

Frontend: HTML5, CSS3, JavaScript  
Backend: Node.js, Express.js  
Database: MongoDB Atlas  
Authentication: JWT + bcrypt

## Quick Start

```bash
npm install
```

Create `.env` from `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Run:

```bash
npm start
```

Open:

http://localhost:5000

## API

| Method | Endpoint | Auth |
|---|---|---|
| POST | /api/auth/register | No |
| POST | /api/auth/login | No |
| GET | /api/auth/me | Yes |
| GET | /api/posts/feed | Yes |
| POST | /api/posts | Yes |
| DELETE | /api/posts/:id | Yes |
| POST | /api/posts/:id/like | Yes |
| GET | /api/posts/:id/comments | Yes |
| POST | /api/posts/:id/comments | Yes |
| GET | /api/posts/user/:username | Yes |
| GET | /api/users/:username | Yes |
| PUT | /api/users/me | Yes |
| POST | /api/users/:id/follow | Yes |
| GET | /api/users/search?q= | Yes |

## Notes

Never commit `.env` or database credentials. Keep `.env` in `.gitignore`.
