# template-expressjs

Template for my Express JS projects

# Author : FORSAKANG CHOFOR JUNIOR

# Don't Forget to Create a .env file And put the connection string in it;

connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/<database>"
example: DATABASE_URL="postgresql://chofor:chofor@localhost:5432/game_shop"

# Also for the .env file add

NODE_ENV="dev"

# Don't forget this is a template;

Meaning you will have to make some editing for you
use case and also make changes to files like populatedb.js and cleardb.js to
match you database and you use case.

# For using connect-pg-simple

Run the following command in your terminal to create the table in your PostgreSQL database (mydatabase should be replaced with your actual database name):
psql mydatabase < node_modules/connect-pg-simple/table.sql

# Run the command below in your terminal to genrate a key for

# Your Session_SECRET In app.use(session({...other properties, secret: process.env.SESSION_SECRET, // Required: Used to sign the session ID cookie

## }))

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Then coppy the output and assign it to SESSION_SECRET in you .env file
