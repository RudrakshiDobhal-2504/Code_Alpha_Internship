# Architecture

Connectify uses a simple layered Express architecture.

Client -> Express API -> Controllers -> Mongoose Models -> MongoDB Atlas

The browser stores the JWT in localStorage for this internship demo and sends it in the Authorization header for protected API calls.

Models:
- User: account, profile, followers/following
- Post: author, content, optional image, likes
- Comment: post, author, content

The backend is intentionally separated into routes, controllers, middleware and models so new features can be added without turning server.js into a monolith.
