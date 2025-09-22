# 🐷 NEO-PIGGY (Modern PiggyMetrics)

A modernized version of [PiggyMetrics](https://github.com/sqshq/PiggyMetrics), rebuilt with **Spring Boot Microservices**, **MongoDB**, and **React.js**, designed for cloud-ready deployment.

---

## ✨ Features
- **Microservices Architecture**: Auth, Account, Statistics, Notification
- **Secure APIs** with Spring Security + JWT
- **MongoDB** for flexible data storage
- **Spring Cloud**: Gateway, Config Server, Eureka Discovery
- **React.js Dashboard** for expense visualization
- **Dockerized** for containerized deployment
- **Future Ready**: AI-driven expense categorization (planned)

---

## 🏗️ Architecture
[ Client (React.js) ]
|
[ API Gateway ] ←→ [ Auth Service ]
| ←→ [ Account Service ]
| ←→ [ Statistics Service ]
| ←→ [ Notification Service ]
|
[ Config Server ] + [ Eureka Server ]

yaml
Copy code

---

## 🚀 Getting Started

### 1. Clone Repo
```bash
git clone https://github.com/WASTED-03/NEO-PIGGY.git
cd NEO-PIGGY
2. Run with Docker
bash
Copy code
docker-compose up --build
3. Access Services
API Gateway → http://localhost:8080

Eureka Dashboard → http://localhost:8761

React Dashboard → http://localhost:3000

📂 Tech Stack
Backend: Java 17, Spring Boot 3, Spring Cloud

Database: MongoDB

Frontend: React.js + TailwindCSS

DevOps: Docker, Docker Compose, GitHub Actions (CI/CD planned)

Cloud: AWS (planned)

👨‍💻 Author
Arnav Ashok – LinkedIn | Portfolio

yaml
Copy code

---

## 3️⃣ Steps to Add Them to Your Repo
1. Open terminal in your repo root:  
```bash
cd path/to/NEO-PIGGY
Create the files:

bash
Copy code
touch .gitignore
touch README.md