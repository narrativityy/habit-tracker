# Running a React App in Docker

This guide walks you through containerizing a React application with Docker, explaining both the "how" and the "why" at each step.

---

## Prerequisites

- Docker installed on your system ([Get Docker](https://docs.docker.com/get-docker/))
- Node.js installed locally (for creating the initial React app)

---

## Step 1: Create a React Application

```bash
npm create vite@latest habit-tracker -- --template react
cd habit-tracker
npm install
```

**Why?** We need a React application to containerize. Vite is a modern build tool that's significantly faster than older alternatives like Create React App. It uses native ES modules during development for near-instant hot module replacement (HMR), making the development experience much snappier.

---

## Step 2: Create a Dockerfile

Create a file named `Dockerfile` (no extension) in your project root:

```dockerfile
# Use Node.js as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite dev server runs on
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
```

### Line-by-Line Explanation:

| Line | What It Does | Why It Matters |
|------|--------------|----------------|
| `FROM node:20-alpine` | Uses a lightweight Linux image with Node.js pre-installed | Alpine is ~5MB vs ~900MB for full images. Your container needs Node.js to run React's dev server. |
| `WORKDIR /app` | Creates and switches to `/app` directory | Keeps your app files organized in a dedicated folder instead of cluttering the root filesystem. |
| `COPY package*.json ./` | Copies only package files first | **Docker layer caching**: If your dependencies haven't changed, Docker reuses the cached `npm install` layer, making rebuilds much faster. |
| `RUN npm install` | Installs dependencies inside the container | The container is isolated—it doesn't have access to your local `node_modules`. |
| `COPY . .` | Copies your source code into the container | Now we bring in the actual application code after dependencies are installed. |
| `EXPOSE 5173` | Documents that the app uses port 5173 | This is metadata for humans and tools—it doesn't actually publish the port. Vite uses 5173 by default. |
| `CMD ["npm", "run", "dev", "--", "--host"]` | Defines the default command to run | Starts Vite's dev server. The `--host` flag is crucial—it makes the server listen on all network interfaces (0.0.0.0) instead of just localhost, allowing access from outside the container. |

---

## Step 3: Create a .dockerignore File

Create a `.dockerignore` file in your project root:

```
node_modules
npm-debug.log
dist
.git
.gitignore
```

**Why?** Similar to `.gitignore`, this tells Docker which files to skip when copying. Key reasons:

1. **node_modules**: We install fresh dependencies inside the container—no need to copy ~200MB of local modules
2. **dist**: Vite's build output folder—generated files shouldn't be in the image; we build fresh
3. **.git**: Version control history isn't needed to run the app

---

## Step 4: Build the Docker Image

```bash
docker build -t habit-tracker .
```

**Breaking it down:**
- `docker build`: Command to create an image from a Dockerfile
- `-t habit-tracker`: Tags (names) your image as "habit-tracker"
- `.`: Tells Docker to look for the Dockerfile in the current directory

**Why?** An image is like a snapshot/template of your application. You build it once, then you can create containers (running instances) from it.

**What happens during build:**
1. Docker reads your Dockerfile
2. Executes each instruction, creating a "layer" for each step
3. Caches layers so future builds are faster
4. Produces a final image you can run anywhere Docker is installed

---

## Step 5: Run the Container

```bash
docker run -p 5173:5173 habit-tracker
```

**Breaking it down:**
- `docker run`: Creates and starts a container from an image
- `-p 5173:5173`: Maps port 5173 on your machine to port 5173 in the container
- `habit-tracker`: The name of the image to run

**Why the port mapping?** Containers are isolated. Without `-p 5173:5173`, the Vite server would be running inside the container but you couldn't access it from your browser. The port mapping creates a tunnel: `localhost:5173` → container's port 5173.

Now visit `http://localhost:5173` in your browser!

---

## Step 6: Development with Live Reloading (Optional)

The basic setup requires rebuilding the image after every code change. For development, use a **volume mount**:

```bash
docker run -p 5173:5173 -v $(pwd)/src:/app/src habit-tracker
```

**New flag explained:**
- `-v $(pwd)/src:/app/src`: Mounts your local `src` folder into the container

**Why?** This creates a live link between your local files and the container. When you edit `src/App.jsx` on your machine, the container sees the change immediately and Vite's hot module replacement (HMR) kicks in—updates appear in the browser almost instantly without a full page reload.

---

## Common Docker Commands Reference

| Command | Purpose |
|---------|---------|
| `docker ps` | List running containers |
| `docker ps -a` | List all containers (including stopped) |
| `docker stop <container_id>` | Stop a running container |
| `docker rm <container_id>` | Remove a stopped container |
| `docker images` | List all images on your system |
| `docker rmi <image_name>` | Remove an image |
| `docker logs <container_id>` | View container output/logs |

---

## Key Concepts Summary

### Image vs Container
- **Image**: A read-only template (like a class in programming)
- **Container**: A running instance of an image (like an object)

### Why Docker for Development?
1. **Consistency**: "Works on my machine" becomes "works on every machine"
2. **Isolation**: Dependencies don't conflict with other projects
3. **Reproducibility**: Anyone can run your exact environment
4. **Learning**: Understanding containers prepares you for deployment

### The Build Context
When you run `docker build .`, the `.` is the "build context"—Docker sends all files in that directory (except those in `.dockerignore`) to the Docker daemon. This is why `.dockerignore` matters for build speed.

---

## Next Steps

Once you're comfortable with this setup, you can explore:

1. **Multi-stage builds**: Create smaller production images
2. **Docker Compose**: Define multi-container setups (React + API + database)
3. **Production Dockerfile**: Use nginx to serve the built React app

---

## Troubleshooting

**"Port 5173 is already in use"**
```bash
docker run -p 3000:5173 habit-tracker
# Access at localhost:3000 instead
```

**Container exits immediately**
```bash
docker logs <container_id>
# Check for error messages
```

**Changes not reflecting**
- Make sure you're using the volume mount (`-v` flag)
- Or rebuild the image: `docker build -t habit-tracker .`
