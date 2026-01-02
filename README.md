# Habit Tracker

A simple React application to track daily habits and visualize progress over time.

## Features

- Add and manage habits
- Mark habits complete each day
- Track streaks and completion history
- Visualize progress with charts and calendars

## Tech Stack

- **React** with Vite for fast development
- **Docker** for containerized development environment

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://docs.docker.com/get-docker/) (optional, for containerized development)

### Run Locally (without Docker)

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### Run with Docker

Using Docker Compose (recommended):

```bash
docker-compose up
```

Or build and run manually:

```bash
docker build -t habit-tracker .
docker run -p 5173:5173 habit-tracker
```

For live reloading during development:

```bash
docker run -p 5173:5173 -v $(pwd)/src:/app/src habit-tracker
```

Open http://localhost:5173 in your browser.

## Project Structure

```
habit-tracker/
├── src/                  # Application source code
├── public/               # Static assets
├── Dockerfile            # Container configuration
├── docker-compose.yml    # Docker Compose configuration
├── DOCKER_GUIDE.md       # Docker learning guide
└── BRAINSTORM.md         # Feature planning document
```

## Documentation

- [DOCKER_GUIDE.md](./DOCKER_GUIDE.md) - Step-by-step Docker tutorial
- [BRAINSTORM.md](./BRAINSTORM.md) - Feature brainstorming and planning
