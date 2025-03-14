# Node.js + MongoDB Docker Setup

This project sets up a Node.js server that connects to a MongoDB instance using Docker containers. It also includes Mongo Express for database management.

## 📌 Features

- Node.js backend with Express.js
- MongoDB database
- Mongo Express for database visualization
- Docker-based deployment

---

## 🚀 How to Set Up

### 1️⃣ Create a Docker Network

Run the following command to create a Docker network named `mango-network`:

```sh
docker network create mango-network
```

### 2️⃣ Run MongoDB and Mongo Express Containers

Run the following commands to start MongoDB and Mongo Express within the network:

```sh
docker run -d -p 27017:27017 --name mango --network mango-network \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=qwerty \
  mongo

docker run -d -p 8081:8081 --name mango-express --network mango-network \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=qwerty \
  -e ME_CONFIG_MONGODB_URL=mongodb://admin:qwerty@mango:27017 \
  mongo-express
```

### 3️⃣ Run the Node.js Application Inside Docker

Create a `Dockerfile` inside your project directory:

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]
EXPOSE 5050
```

Then, build and run the container:

```sh
docker build -t my-node-app .
docker run -d -p 5050:5050 --name node-app --network mango-network my-node-app
```

---

## 📡 API Endpoints

### 🟢 Get All Users

**URL:** `http://localhost:5050/getUsers`

```sh
curl -X GET http://localhost:5050/getUsers
```

### 🟢 Add a New User

**URL:** `http://localhost:5050/addUser`

```sh
curl -X POST -d "name=John&age=25" http://localhost:5050/addUser
```

---

## 🔍 Check Running Containers

```sh
docker ps
```

You should see:

- **MongoDB (\*\***`mango`\***\*)**
- **Mongo Express (\*\***`mango-express`\***\*)**
- **Node.js App (\*\***`node-app`\***\*)**

If everything is running correctly, your API should be accessible at `http://localhost:5050`.

---

## 🏠 Home Page

Your application is accessible at:

**URL:** `http://localhost:5050/`

---

## 🎯 Conclusion

This setup ensures a smooth development environment using Docker, making the Node.js app easily deployable with MongoDB. 🚀
