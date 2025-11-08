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

# 9. Deployment & networking (how to make it work on LAN, ngrok, Vercel, or hosted services)

This project can be run locally on your network, exposed temporarily with ngrok, or deployed to a hosted service. Below are minimal, actionable options.

A. Run on local network (for development / device testing)
- Make sure your server binds to 0.0.0.0 or the default (most Express apps do).
- Start server: node server.js
- Find your machine IP (Windows: ipconfig; mac/linux: ifconfig).
- In the mobile app's api.js set BASE_URL to http://<YOUR_IP>:3000/api
- Ensure firewall allows incoming connections on PORT (3000) or use the same port as .env.

B. Temporary public URL with ngrok (no DNS)
- Install ngrok (https://ngrok.com/).
- Run: ngrok http 3000
- Copy the https://xxxx.ngrok.io URL and set BASE_URL in mobile app to https://xxxx.ngrok.io/api
- Keep ngrok running while testing. Good for quick demos.

C. Deploy a full Express server (recommended if you want a persistent backend)
- Use Render, Railway, Heroku, or similar (these run your Node/Express app without code changes).
- Steps (generic):
  1. Push project to a Git provider (GitHub/GitLab).
  2. Create a new service on Render/Railway/Heroku and connect your repo.
  3. Set environment variables in the host dashboard: DB_HOST, DB_USER, DB_PASS, DB_NAME, PORT.
  4. Set the start command to: node server.js
  5. Deploy and note the public HTTPS URL, set BASE_URL in mobile app accordingly.
- These platforms will give you a stable URL and let you set env vars in a dashboard.

D. Deploy as Serverless on Vercel (requires converting endpoints)
- Vercel serves serverless functions from an /api folder. If you want to use Vercel:
  1. Create lightweight serverless handlers for each endpoint in /api (e.g. api/tickets.js) that export default (req, res) => { ... } and use mysql2 to connect.
  2. Move environment variables to Vercel Project Settings (Environment Variables).
  3. Deploy via `vercel` or connect your repo to Vercel.
  4. Vercel functions run on demand; adapt connection pooling (create new connection per invocation or reuse a global pool).
- If your app uses many Express middlewares, consider deploying the Express app to Render/Heroku instead of converting it.

E. Docker + VPS (full control)
- Build a Dockerfile that runs node server.js and expose the port.
- Run on a VPS, set up a reverse proxy (Nginx), and get TLS via Let's Encrypt.
- Set DB connection either to a managed DB or a separate container and secure network access.

Security & production tips
- Never commit `.env` to source control.
- Use strong DB credentials and restrict DB access to trusted hosts (or use private networks).
- Use HTTPS in production (ngrok provides HTTPS; hosted platforms give it automatically).
- Consider soft-delete (deleted_at) for recoverability, and backups for your MySQL database.
- Configure connection pooling and proper timeouts for production traffic.

# End of guide
