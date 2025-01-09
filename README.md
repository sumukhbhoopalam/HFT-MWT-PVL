# Project: HFT-MWT-PVL

This project is a modern web application consisting of a React frontend, a Fast API backend, and a PostgreSQL database. The application is designed to manage shopping items and runs seamlessly with Docker Compose and Kubernetes. The backend has been updated to use FastAPI for better performance and simplicity.

---
## Contributors

- **Sumukh Bhoopalam**
- **Apoorva Ajay**
## Features

1. **Frontend**
   - Built using React.js.
   - Responsive UI for managing shopping items.
   - Communicates with the backend via REST APIs.

2. **Backend**
   - Developed using **FastAPI**, a modern web framework for Python.
   - Handles all business logic and communicates with the PostgreSQL database.
   - Exposes RESTful APIs for frontend consumption.

3. **Database**
   - PostgreSQL is used as the relational database.
   - Stores shopping items data and other application-related information.

4. **Containerization**
   - Docker Compose is used for local development and testing.
   - Each service (frontend, backend, database) runs in its own container.

5. **Kubernetes Deployment**
   - Kubernetes YAML files for deploying the application to a cluster.
   - Services include frontend, backend, and database with proper networking.

## Getting Started

### Local Development (Docker Compose)

1. Clone the repository:
   ```bash
   git clone https://github.com/sumukhbhoopalam/HFT-MWT-PVL.git
   cd HFT-MWT-PVL
   ```

2. Start the application:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend (FastAPI): [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI for API testing)

---

### Kubernetes Deployment

1. Ensure Minikube is running:
   ```bash
   minikube start
   ```

2. Deploy the application:
   ```bash
   kubectl apply -f k8s/
   ```

3. Get the IP and Port:
   ```bash
   minikube service frontend --url
   ```

4. Access the application via the URL provided by Minikube.

---

## Environment Variables

### Frontend
- `REACT_APP_BACKEND_URL`: URL of the backend API.

### Backend (FastAPI)
- `DATABASE_URL`: Connection string for PostgreSQL.

### Example `.env` for Backend:
```
DATABASE_URL=postgresql://user:password@db:5432/mydatabase
```

---

## Technologies Used

- **Frontend**: React.js
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes

---

## API Endpoints

### FastAPI Endpoints

1. **Get All Items**
   ```
   GET /api/shoppingItems
   ```

2. **Add an Item**
   ```
   POST /api/shoppingItems
   Body: {
     "name": "item_name",
     "price": 10.5
   }
   ```

3. **Delete an Item**
   ```
   DELETE /api/shoppingItems/{id}
   ```

For full API documentation, visit [http://localhost:8000/docs](http://localhost:8000/docs).