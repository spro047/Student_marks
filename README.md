# EduTrack - Student Marks Management System

EduTrack is a modern web application built with Node.js and MongoDB Atlas to manage student names, roll numbers, and internal marks for engineering subjects.

## ✨ Features

- **User Authentication**: Secure Login and Registration system.
- **Student Enrollment**: Add student names and unique roll numbers.
- **Engineering Curriculum**: Pre-defined 8 core engineering subjects.
- **Marks Tracking**: Manage marks for 1st and 2nd Internal assessments.
- **Premium UI**: Glassmorphism design with responsive layouts.

## 🛠️ Tech Stack

- **Backend**: Node.js & Express.js
- **Database**: MongoDB Atlas (Mongoose)
- **Frontend**: EJS (Embedded JavaScript Templates)
- **Authentication**: Bcrypt.js & Express-Session
- **Styling**: Modern CSS3 (Vanilla)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- A MongoDB Atlas Account

## 🚀 Setup & Execution

Follow these steps to get the project running on your local machine:

### 1. Configure Environment Variables
Open the `.env` file in the root directory and update your MongoDB connection string with your actual password:

```env
MONGODB_URI=mongodb+srv://Shashank_Shetgeri:YOUR_PASSWORD_HERE@cluster0.mhg7dnk.mongodb.net/student_marks?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
SESSION_SECRET=your_random_secret_here
```

### 2. Install Dependencies
Open your terminal/command prompt in the project folder and run:
```bash
npm install
```

### 3. Start the Server
To start the application, run:
```bash
npm start
```
*For development with automatic restarts, you can use:* `npm run dev`

### 4. Access the App
Open your web browser and go to:
[http://localhost:3000](http://localhost:3000)

## 🐳 Docker Execution

If you have Docker installed, you can run the application as a container:

### 1. Build the Image
```bash
docker build -t edutrack-app .
```

### 2. Run the Container
Replace the placeholders with your actual MongoDB URI and a random session secret:
```bash
docker run -p 3000:3000 \
  -e MONGODB_URI="your_mongodb_atlas_uri_here" \
  -e SESSION_SECRET="your_random_secret" \
  edutrack-app
```

### 3. Access the App
The app will be available at [http://localhost:3000](http://localhost:3000).

## � Monitoring (Prometheus, Grafana, cAdvisor)

You can monitor the application performance and resource usage using the integrated monitoring stack.

### 1. Start the Stack
```bash
docker-compose up -d
```

### 2. Access the Dashboards
- **EduTrack App**: [http://localhost:3000](http://localhost:3000)
- **Prometheus**: [http://localhost:9090](http://localhost:9090) (Query data)
- **Grafana**: [http://localhost:3001](http://localhost:3001) (Visualize metrics)
  - Default Login: `admin` / `admin`
- **cAdvisor**: [http://localhost:8080](http://localhost:8080) (Raw container metrics)

### 3. Setup Grafana
1. Log in to Grafana.
2. Go to **Connections** > **Data Sources**.
3. Add **Prometheus**.
4. Set the URL to `http://prometheus:9090`.
5. Save & Test.
6. Import Dashboards (e.g., Docker Container metrics) to see the graphs.

## ☸️ Kubernetes (Minikube) Deployment

### Prerequisites
You must have **Minikube** and **kubectl** installed.

**Installation (Run in PowerShell as Admin):**
```powershell
winget install Kubernetes.minikube
winget install Kubernetes.kubectl
```
*Restart your terminal after installation.*

To deploy the entire monitoring stack and application on Kubernetes using Minikube:

### 1. Build Image for Minikube
Use the Minikube Docker daemon so Kubernetes can find your image:
```bash
eval $(minikube docker-env)
docker build -t edutrack-app:latest .
```

### 2. Deploy Manifests
Apply all the configuration files:
```bash
# Create namespace
kubectl apply -f k8s/monitoring-namespace.yaml

# Deploy Monitoring Configs
kubectl apply -f k8s/prometheus-configmap.yaml
kubectl apply -f k8s/prometheus-deployment.yaml
kubectl apply -f k8s/grafana-deployment.yaml

# Deploy Application
kubectl apply -f k8s/app-secrets.yaml
kubectl apply -f k8s/app-deployment.yaml
```

### 3. Access Services
Minikube exposes services on different IP/Ports. Use these commands to open them:
```bash
# Open App
minikube service edutrack-app-service

# Open Prometheus (Monitoring Namespace)
minikube service prometheus-service -n monitoring

# Open Grafana (Monitoring Namespace)
minikube service grafana -n monitoring
```

## �📖 How to Use

1.  **Register**: Go to the Register page and create an account.
2.  **Login**: Log in with your new credentials.
3.  **Add Student**: Click on "+ Add New Student" to enroll a student.
4.  **Manage Marks**: Click "Manage Marks" on any student card to input internal scores for all subjects.
5.  **Save**: Click "Update Marks" to persist the data to MongoDB Atlas.

## 📚 Engineering Subjects Included
- Engineering Mathematics
- Engineering Physics
- Engineering Chemistry
- Basic Electronics
- Basic Electrical
- Computer Programming
- Engineering Mechanics
- Engineering Graphics

---
Developed with ❤️ by Antigravity
