# Members Only

A Node.js authentication application built to practice and showcase authentication skills using Passport.js with local strategy, Express, and PostgreSQL.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Author](#author)

## Features

- User authentication with Passport.js local strategy
- Secure password hashing with bcryptjs
- Session management with PostgreSQL session store
- EJS templating for dynamic views
- Input validation and error handling
- User authorization for protected routes

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Authentication**: Passport.js (local strategy)
- **Database**: PostgreSQL
- **Template Engine**: EJS
- **Security**: bcryptjs, express-session
- **Tools**: dotenv (environment variables)

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (running locally or remote database access)
- npm

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Members-Only
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://<role_name>:<role_password>@localhost:5432/<database_name>
SESSION_SECRET=<your-generated-secret-key>
PORT=3000
```

**Example:**

```env
DATABASE_URL=postgresql://chofor:password@localhost:5432/members_only
SESSION_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
PORT=3000
```

### 2. Generate Session Secret

Generate a secure random key for `SESSION_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and add it to your `.env` file.

### 3. Set Up PostgreSQL Session Table

Run the following command to create the session table in your PostgreSQL database:

**For local PostgreSQL:**

```bash
psql <database_name> < node_modules/connect-pg-simple/table.sql
```

**For remote databases (e.g., Neon):**

```bash
psql <YOUR_FULL_CONNECTION_STRING> < node_modules/connect-pg-simple/table.sql
```

## Project Structure

```
.
├── app.js                 # Express application entry point
├── package.json           # Project dependencies and scripts
├── .env                   # Environment variables (create this)
├── config/
│   └── passport.js        # Passport authentication configuration
├── controllers/           # Request handlers
│   ├── deleteFromDB.js
│   ├── postToDB.js
│   ├── putToDB.js
│   ├── readDB.js
│   └── validations/       # Input validation middleware
│       ├── validateCode.js
│       ├── validateLogIn.js
│       ├── validateMessege.js
│       └── validateSignUp.js
├── db/                    # Database utilities
│   ├── pool.js            # PostgreSQL connection pool
│   ├── queriesDelete.js
│   ├── queriesGet.js
│   ├── queriesPost.js
│   ├── queriesPut.js
│   ├── populatedb.js      # Database seeding script
│   └── reStartDB.js       # Database reset script
├── routes/
│   └── indexRouter.js     # Application routes
├── views/                 # EJS templates
│   ├── index.ejs
│   ├── join.ejs
│   ├── logIn.ejs
│   ├── newMessage.ejs
│   ├── signUp.ejs
│   └── partials/          # Reusable template components
│       ├── errors.ejs
│       └── head.ejs
└── public/                # Static assets
    ├── index.js
    └── style.css
```

## Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

The application will start in watch mode and reload on file changes.

### Production Mode

```bash
npm start
```

The application will run on `http://localhost:3000` (or the PORT specified in `.env`).

## Available Scripts

- `npm start` - Run the application
- `npm run dev` - Run in development mode with file watching
- `npm run populatedb` - Populate the database with initial data
- `npm run reStartdb` - Reset and restart the database

## Author

**FORSAKANG CHOFOR JUNIOR**

- [GitHub](https://github.com/ChoforJr)
- [LinkedIn](https://www.linkedin.com/in/choforforsakang/)

---

## Notes

- This project is part of The Odin Project curriculum
- The application currently uses local authentication strategy
- All passwords are hashed using bcryptjs before storage
- Session data is persisted in PostgreSQL using connect-pg-simple
