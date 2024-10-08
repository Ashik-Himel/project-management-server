# Project Management Server

## Setup

Clone the repository <br />

```
git clone https://github.com/Ashik-Himel/project-management-server.git
```

Install all the dependencies <br />

```
npm install
```

Create a `.env` file with the following variables:

- EMAIL_ID
- EMAIL_PASS
- SERVER_DOMAIN
- JWT_SECRET
- DB_URI
  <br />
  **N.B.** EMAIL_PASS should be the less secure password generated from 'App Passwords' in the google account. EMAIL_ID and EMAIL_PASS is using to work nodemailer properly. SERVER_DOMAIN should be the domain of the server. When in development, it will be 'http://localhost:3000'.

Finally, run `npm run dev` to start the development server in your local machine.

```
npm run dev
```

**N.B.** Make sure all files in the editor are using LF format. If not, you will get linting error. Also, make sure you have installed `nodemon` package globally in your machine before run the development server.
