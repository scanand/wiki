---
sidebar_label: 'Docker'
sidebar_position: 3
---

# 🐳 Docker Commands Cheat Sheet

## 1. Docker Version & Info
| Command | Description |
|---------|-------------|
`docker --version` | Show Docker version  
`docker info` | Display system-wide info  
`docker help` | Show general help  
`docker <command> --help` | Help for specific command  

---

## 2. Images
| Command | Description |
|---------|-------------|
`docker images` | List local images  
`docker pull <image>` | Pull from registry  
`docker rmi <image>` | Remove image  
`docker tag <src> <target>` | Tag image  
`docker save -o file.tar <image>` | Save image to tar  
`docker load -i file.tar` | Load image from tar  

---

## 3. Containers
| Command | Description |
|---------|-------------|
`docker ps` | List running containers  
`docker ps -a` | List all containers (incl. stopped)  
`docker run <image>` | Run container (default foreground)  
`docker run -d <image>` | Run in detached mode  
`docker run -it <image> bash` | Run with interactive shell  
`docker stop <id>` | Stop container  
`docker start <id>` | Start stopped container  
`docker restart <id>` | Restart container  
`docker rm <id>` | Remove container  
`docker rm -f <id>` | Force remove running container  
`docker logs <id>` | View container logs  
`docker exec -it <id> bash` | Open shell inside running container  
`docker inspect <id>` | Full container details  

---

## 4. Build & Tag Images
| Command | Description |
|---------|-------------|
`docker build -t myapp .` | Build image from Dockerfile  
`docker build -f Dockerfile.dev -t myapp .` | Build with custom Dockerfile  
`docker build --platform linux/amd64 -t myapp .` | Build for specific architecture  
`docker commit <container> <image:tag>` | Create image from container  

---

## 5. Docker Compose
| Command | Description |
|---------|-------------|
`docker compose up` | Start services (foreground)  
`docker compose up -d` | Start in background  
`docker compose down` | Stop + remove services, network, volumes  
`docker compose ps` | List compose containers  
`docker compose logs -f` | Stream logs  
`docker compose build` | Build/rebuild services  

1. Check which container exist
`docker-compose ps -a`

2. How to run docker compose
`docker-compose up`

3. When you change the definition in docker-compose, need to re-run the container
`docker-compose down`

✅ Works for both `docker compose` (v2+) and legacy `docker-compose`.

---

## 6. Volumes & Networks
| Command | Description |
|---------|-------------|
`docker volume ls` | List volumes  
`docker volume rm <name>` | Remove volume  
`docker network ls` | List networks  
`docker network create <name>` | Create network  
`docker network inspect <name>` | Inspect network  

---

## 7. Clean-up (Prune)
| Command | Description |
|---------|-------------|
`docker system prune` | Remove stopped containers, unused networks, dangling images  
`docker system prune -a` | Remove **all** unused images + containers  
`docker image prune -a` | Remove unused images  
`docker container prune` | Remove stopped containers  
`docker volume prune` | Remove unused volumes  

⚠️ **Be careful with `-a` → deletes unused images**

---

## 8. Registry & Login
| Command | Description |
|---------|-------------|
`docker login` | Login to registry  
`docker logout` | Logout  
`docker push <image>` | Push to registry  
`docker pull <image>` | Pull from registry  

---

## 9. Debugging & Stats
| Command | Description |
|---------|-------------|
`docker top <container>` | View running processes  
`docker stats` | Live container resource usage  
`docker events` | Real-time Docker events  
`docker diff <container>` | Show filesystem changes  

---

## 10. Multi-Platform Build (Useful for ARM/M1/M2)

```sh
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 -t myapp:latest --push .