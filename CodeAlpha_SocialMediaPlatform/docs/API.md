# API Reference

Authentication uses a JWT returned by login/register. Send it as:

`Authorization: Bearer <token>`

## Auth

### Register
`POST /api/auth/register`

```json
{
  "name": "Rudrakshi Dobhal",
  "username": "rudrakshi",
  "email": "rudrakshi@example.com",
  "password": "Test@12345"
}
```

### Login
`POST /api/auth/login`

```json
{
  "email": "rudrakshi@example.com",
  "password": "Test@12345"
}
```

## Posts

### Create
`POST /api/posts`

```json
{
  "content": "Hello Connectify!",
  "image": ""
}
```

### Like
`POST /api/posts/:id/like`

### Comments
`GET /api/posts/:id/comments`

`POST /api/posts/:id/comments`

```json
{ "content": "Great post!" }
```

## Users

### Update own profile
`PUT /api/users/me`

```json
{
  "name": "Rudrakshi Dobhal",
  "bio": "CSE student and developer.",
  "avatar": ""
}
```

### Follow/unfollow
`POST /api/users/:id/follow`
