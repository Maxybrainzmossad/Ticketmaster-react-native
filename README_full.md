# TICKET BACKEND SETUP GUIDE 

### Purpose of this document
This is a step by step guideline on how to setup the backend for the Ticket Application.

# 1. What this backend does

This backend is responsible for:
- receiving ticket data from the app
- saving the ticket information to MySQL
- saving the ticket image URL
- loading ticket back to the app when needed
- editing ticket
- deleting ticket

The mobile app will not talk directly to MySQL.
It will talk to the backend server.

# 2. Tools used

- Node.js
- Express
- MySQL
- Axios (on the mobile app side)
- phpMyAdmin is used only to view & confirm data

phpMyAdmin is NOT the backend.

# 3. Database Setup

# Step A: Create database

Open phpMyAdmin → SQL tab → run:

CREATE DATABASE ticketsystem;

Then select this database.

# Step B: Import the schema.sql file

Inside phpMyAdmin
- click the database
- click Import
- pick `schema.sql`
- Click Go

This will create the tables we need.

# 4. Backend Setup

Place these files together in ONE folder:
- server.js
- .env
- README.md (this file)
- package.json (will be created automatically)

# Step A: Install backend libraries

Open terminal / command prompt inside the folder and run:

npm install express mysql2 dotenv cors

# Step B: Create `.env` file

This file contains MySQL login info:

DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password_here
DB_NAME=ticketsystem
PORT=3000

If your MySQL has no password leave DB_PASS empty.

# Step C: Start the backend

node server.js

If everything is correct you will see:
`Server running on port 3000`

# 5. Connecting the Mobile App

Inside the React Native app use the axios service file (api.js)

IMPORTANT:
Change the IP in api.js to the IP address of the machine running server.js

Example line:

const BASE_URL = 'http://192.168.1.14:3000/api';


That IP must be replaced with your local IP (ipconfig on Windows / ifconfig on Mac)

# 6. How the flow works

Phone App  →  axios request  →  server.js  →  database (MySQL)

phpMyAdmin only displays the data inside the database after it is stored.



# 7. Testing

After server is running — test inserting ticket from the app.

Then go to phpMyAdmin → tickets table → you should see the new ticket row.

That means everything is correct.

# 8. Summary

- Database stores ticket info
- server.js talks to database
- React Native talks to server.js
- phpMyAdmin is only for checking data
- `.env` protects your connection details
- api.js is responsible for sending data to backend

This is the complete backend setup instructions.

-

# End of guide