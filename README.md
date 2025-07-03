# Crowdfunding Platform

## Context
Crowdfunding platforms empower individuals and organizations to raise funds for various causes, projects, or startups by collecting donations from a broad audience. A seamless and engaging platform fosters more successful campaigns by making it easy for users to start, promote, and track their funding efforts.

## Project Goal
Develop a crowdfunding platform where users can create and manage campaigns, track donations in real-time, and engage with supporters through interactive features like live comments and updates.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- HTML
- CSS
- JavaScript
- JWT (JSON Web Tokens)
- Bcrypt

## Features
- User registration and authentication
- Campaign creation wizard
- Real-time donation tracking
- Supporter interactions (comments, updates)
- Secure login/logout with JWT
- Password hashing with Bcrypt
- Backend APIs built with Node.js and Express
- Frontend built with HTML, CSS, and JavaScript

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/nandan2506/B44_WEB_051.git
   ```

2. Navigate to backend and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Navigate to frontend and set up (if needed):
   ```
   cd ../frontend
   ```

4. Set up environment variables (in backend):
   - Create a `.env` file in the `backend` folder
   - Add the following:
     ```
     PORT=8000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

5. Start the server:
   ```
   nodemon server.js
   ```

6. Open the frontend `index.html` file in your browser.

## Folder Structure
```
crowdfunding-platform/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── campaign/
│   ├── donate/
│   ├── user/
│   ├── index.css
│   └── index.html
│   └── index.js
└── README.md
```


## License
This project is licensed under the MIT License.
