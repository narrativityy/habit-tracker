# Habit Tracker

A simple React application to track daily habits and visualize progress over time.

## Features

- Add and manage habits
- Mark habits complete each day
- Track streaks and completion history
- Visualize progress with charts and calendars
- Dark mode support

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express.js + MongoDB
- **Docker** for containerized development

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://docs.docker.com/get-docker/)

### Run with Docker (Recommended)

Start all services (frontend, backend, MongoDB):

```bash
docker-compose up
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- MongoDB: localhost:27017

### Run Locally (without Docker)

**Frontend:**
```bash
cd client
npm install
npm run dev
```

**Backend:**
```bash
cd server
npm install
npm run dev
```

Note: You'll need MongoDB running locally for the backend.

## Project Structure

```
habit-tracker/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # React Context providers
│   │   └── hooks/        # Custom hooks
│   ├── Dockerfile
│   └── package.json
├── server/               # Express backend
│   ├── server.js         # API routes & MongoDB models
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml    # Multi-container Docker config
├── DOCKER_GUIDE.md       # Docker learning guide
└── BRAINSTORM.md         # Feature planning document
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/habits | Get all habits |
| POST | /api/habits | Create a habit |
| PUT | /api/habits/:id | Update a habit |
| DELETE | /api/habits/:id | Delete a habit |
| POST | /api/habits/:id/toggle | Toggle completion for a date |
| GET | /api/health | Health check |

## Documentation

- [DOCKER_GUIDE.md](./DOCKER_GUIDE.md) - Step-by-step Docker tutorial
- [BRAINSTORM.md](./BRAINSTORM.md) - Feature brainstorming and planning
