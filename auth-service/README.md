# NEO-PIGGY auth-service

Spring Boot 3 microservice for authentication and authorization using MongoDB and JWT.

Features
- Java 17, Spring Boot 3.x
- MongoDB persistence (Spring Data)
- Entities:
  - User: id (UUID), name, email (unique), password (BCrypt), roles (List<String>)
  - Role: id (UUID), name (ROLE_USER, ROLE_ADMIN)
- JWT-based authentication:
  - POST /api/auth/signup
  - POST /api/auth/login
  - POST /api/auth/refresh
  - GET /api/auth/me
- Spring Security role-based access
- Unit tests for controller and service
- Dockerfile for containerization

Quick Start
1) Start MongoDB
docker run -d --name mongo -p 27017:27017 mongo:6

2) Build and run
mvn clean package
java -jar target/auth-service-0.0.1-SNAPSHOT.jar

Environment
- MONGODB_URI: mongodb://localhost:27017/neo-piggy-auth
- PORT: 8081
- JWT_SECRET: at least 32 characters
- JWT_EXP_MINUTES: default 60
- JWT_REFRESH_EXP_MINUTES: default 43200 (30 days)

Docker
docker build -t auth-service .
docker run --rm -p 8081:8081 \
  -e MONGODB_URI='mongodb://host.docker.internal:27017/neo-piggy-auth' \
  -e JWT_SECRET='your-32+char-secret' \
  auth-service
