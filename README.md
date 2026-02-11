# Project Title

NeuraTalk – AI Powered Thread-Based Chat Application

A full-stack conversational AI application with persistent thread-based chat history built using the MERN stack and OpenAI API.


## Overview

NeuraTalk is a full-stack AI chat application with:
- a **React + Vite frontend** for chat UI and thread management,
- an **Express backend** for API routes and OpenAI integration,
- and **MongoDB (via Mongoose)** for storing chat threads and messages.

The app lets users create new chats, send prompts, get AI responses, view previous threads, and delete threads.

## Features

- Create a new conversation thread.
- Send messages and receive AI replies.
- Persist chat history in MongoDB.
- View all previous threads in a sidebar.
- Switch between threads.
- Delete threads.
- Render markdown-style AI responses with syntax highlighting.

## Tech Stack

- **Frontend:** React 19, Vite, React Markdown, Rehype Highlight, UUID
- **Backend:** Node.js, Express, CORS, dotenv, OpenAI API
- **Database:** MongoDB with Mongoose ODM

## Architecture / Project Structure

```txt
NeuraTalk/
├── Frontend/                  # React + Vite client
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ChatWindow.jsx
│   │   ├── Chat.jsx
│   │   └── ...
│   └── package.json
├── Backend/                   # Express API server
│   ├── server.js
│   ├── routes/chat.js
│   ├── models/Thread.js
│   ├── utils/openai.js
│   └── package.json
└── README.md
```

### How frontend connects to backend

The frontend directly calls backend endpoints using `fetch`:
- `http://localhost:9090/api/chat`
- `http://localhost:9090/api/thread`
- `http://localhost:9090/api/thread/:threadId`

So both services should run locally at:
- Frontend: `http://localhost:5173` (default Vite)
- Backend: `http://localhost:9090`

## System Design Overview

The high-level request lifecycle of the application is:

- Frontend sends user message to backend.
- Backend stores message in MongoDB.
- Backend calls OpenAI API for AI response.
- AI response is saved in the same thread.
- Updated thread data is returned to frontend.


## Installation & Setup

### 1) Clone the repository

```bash
git clone <your-repo-url>
cd NeuraTalk
```

### 2) Install dependencies

Install backend dependencies:
```bash
cd Backend
npm install
```

Install frontend dependencies:
```bash
cd ../Frontend
npm install
```

## Environment Variables

Create a `.env` file inside `Backend/`:

```env
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_connection_string
```

## API Endpoints 

Base URL: `http://localhost:9090/api`

- `POST /chat`
  - Body:
    ```json
    {
      "threadId": "string",
      "message": "string"
    }
    ```
  - Description: Adds a user message, gets OpenAI reply, saves both in thread, and returns reply.

- `GET /thread`
  - Description: Returns all thread metadata/messages (used for sidebar list).

- `GET /thread/:threadId`
  - Description: Returns messages for a specific thread.

- `DELETE /thread/:threadId`
  - Description: Deletes a thread.

- `POST /test`
  - Description: Test route to insert a sample thread in DB.

## Usage

### Start backend

```bash
cd Backend
node server.js
```

### Start frontend

In a second terminal:

```bash
cd Frontend
npm run dev
```

Then open the local URL shown by Vite (usually `http://localhost:5173`).


## Deployment 

Currently running in local development environment.
Deployment planned using Vercel (frontend) and Render (backend).

Suggested deployment approach:
- Frontend: Vercel / Netlify
- Backend: Render / Railway
- Database: MongoDB Atlas

When deploying, update frontend API URLs to your hosted backend domain.

## Challenges & Learnings

- Managing thread-based chat state across components (`App`, `Sidebar`, `ChatWindow`, `Chat`).
- Keeping frontend state in sync with persisted DB thread data.
- Integrating OpenAI chat completion responses into the app flow.
- Handling markdown + code block rendering in chat responses.

## Future Improvements

- Add authentication and per-user chat history.
- Add loading/error/toast UI states.
- Add message streaming for better UX.
- Add request validation and stronger error handling in backend routes.
- Add pagination/search for thread history.
- Add automated tests (API + UI).
- Add Docker and CI/CD.

## Author

Ramandeep Kaur
