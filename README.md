A RESTful Blog API built with Node.js, Express.js, MongoDB, Mongoose,JWT, bcrypt, and cookie-parser.

This backend provides user authentication and complete CRUD operationsfor blog posts. Authentication is handled using JWT stored in anHTTP-only cookie.

Features

User registration

User login

Password hashing with bcrypt

JWT authentication

JWT stored in HTTP-only cookies

Authentication middleware

Create blog posts

Get all posts

Get a single post by ID

Get the 3 most recent posts

Update posts

Delete posts

Only post owners can update or delete their posts

Mongoose populate() for author information

MongoDB database integration

Environment variables for secrets and configuration

Tech Stack

Node.js

Express.js

MongoDB

Mongoose

JSON Web Token (JWT)

bcrypt

cookie-parser

dotenv

CORS

Project Structure

project/
│
├── config/
│   ├── db.js
│   └── token.js
│
├── controllers/
│   ├── userController.js
│   └── postController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── userModel.js
│   └── postModel.js
│
├── routes/
│   ├── userRoutes.js
│   └── postRoutes.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── server.js

Installation

Clone the repository and move into the project directory:

git clone https://github.com/Vikas123Rathore/backend-project
cd <project-folder>

Install dependencies:

npm install

Environment Variables

Create a .env file in the project root.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

Do not commit .env to GitHub.

Use .env.example as a template:

PORT=5000
MONGO_URI=
JWT_SECRET=
NODE_ENV=development

Make sure .gitignore contains:

node_modules/
.env

Running the Server

For development:

npm run dev

Or:

npm start

The API will run at:

http://localhost:5000

Authentication Flow

The authentication flow works like this:

Register/Login
      ↓
Password verified/hashed
      ↓
JWT generated
      ↓
JWT stored in HTTP-only cookie
      ↓
Protected request
      ↓
protect middleware
      ↓
JWT verified
      ↓
req.userId created
      ↓
Controller uses req.userId

The server does not rely on the client sending authorId when creatinga post. The logged-in user's ID is taken from the verified JWT.

API Endpoints

User Authentication

Register

POST /api/user/register

Request body:

{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}

Login

POST /api/user/login

Request body:

{
  "email": "john@example.com",
  "password": "123456"
}

A successful login creates a JWT and stores it in an HTTP-only cookienamed token.

Posts

Create Post

POST /api/post

Authentication required.

Request body:

{
  "title": "My First Post",
  "content": "Hello World"
}

The authorId is automatically taken from the authenticated user's JWT.

Get All Posts

GET /api/post

Returns all posts with author name and email.

Get Post By ID

GET /api/post/:id

Get Top 3 Recent Posts

GET /api/post/top

Returns the three newest posts.

Update Post

PUT /api/post/:id

Authentication required.

Request body:

{
  "title": "Updated Title",
  "content": "Updated content"
}

Only the post owner can update the post.

Delete Post

DELETE /api/post/:id

Authentication required.

Only the post owner can delete the post.

Mongoose Populate

Posts store the user's MongoDB ObjectId as authorId.

Example:

authorId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}

When fetching posts:

Post.find()
  .populate("authorId", "name email")

Mongoose replaces the authorId reference with the corresponding user'sname and email.

Security

Passwords are hashed using bcrypt.

JWT is stored in an HTTP-only cookie.

JWT secret is stored in environment variables.

Users cannot update or delete another user's posts.

.env is excluded from Git.

Passwords are removed before returning user data in API responses.

Testing with Postman

Recommended testing order:

Register a user.

Login with the same user.

Confirm that the token cookie is stored in Postman.

Create a post using POST /api/post.

Get all posts.

Get a post by ID.

Update your own post.

Try updating another user's post.

Delete your own post.

For protected routes, Postman must send the token cookie.

Example Success Response

Create Post

{
  "message": "Post created successfully",
  "post": {
    "_id": "...",
    "title": "My First Post",
    "content": "Hello World",
    "authorId": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}

Future Improvements

Logout endpoint

Get current logged-in user

Pagination

Search posts

Post categories/tags

Image upload

Comments and likes

Role-based authorization

Request validation

Centralized error handling

API documentation with Swagger

License

This project is for learning and development purposes.
