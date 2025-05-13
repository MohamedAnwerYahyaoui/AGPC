# 🏗️ Construction Project Management Web Application

This project was developed as part of the **PIDev (Projet d'Intégration et Développement)** during the second year of the engineering cycle in **SAE (Software Architecture Engineering)**.

It is a full-stack web application built to digitize and streamline the management of construction projects by integrating multiple operational modules into a single platform. The application provides robust tools for managing users, project deliverables, financial resources, human resources, insurance, documents, complaints, and environmental data.

---

## 📌 Table of Contents

- [🧩 About the Project](#-about-the-project)
- [🚀 Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🧱 Architecture](#-architecture)
- [⚙️ Installation](#-installation)


---

## 🧩 About the Project

This Construction Management System is designed to handle the complexity of real-world construction projects. It allows engineers, managers, and team members to coordinate through one platform. Key operations like resource planning, document handling, employee scheduling, and financial monitoring are efficiently managed within their respective modules.

Each module operates as an independent microservice, enabling scalability, maintainability, and performance across the system.

---

## 🚀 Features

### ✅ User Management
- Secure login with Keycloak-based authentication
- Role-based authorization using JWT & Spring Security
- Admin, Manager, Employee access levels

### 📦 Deliverables Management
- Add/update/delete project deliverables
- Assign deliverables to teams or individuals
- Track completion progress and status

### 🛠️ Resource Management
- Monitor tools, materials, and equipment
- Allocate resources to different sites
- Track stock availability and usage history

### 📁 Document Management
- Upload and categorize documents 
- Version control support for document updates

### 🛡️ Insurance Management
- Track insurance policies for employees, materials, or equipment
- Set expiration alerts and validation checks
- Upload and store insurance documents securely

### 💰 Finance Management
- Budget estimation and allocation
- Expense tracking by department or project
- Financial reporting with real-time analytics

### 🌱 Environmental Compliance
- Register environmental risks and regulations
- Generate audit and compliance reports

### 👷 Employee Management
- Handle employment contracts with start/end dates and renewal tracking
- Assign employees to projects
- Manage employee leaves (congés), including request submission

### 📢 Complaint/Reclamation Management
- Allow users to submit complaints (e.g., safety issues, delays)
- Track resolution status
- Maintain history of user feedback

---

## 🛠️ Tech Stack

### 🔹 Frontend
- Angular 16+
- HTML5, CSS3
- Bootstrap 5
- Tailwind CSS
- Angular Material (for UI components)

### 🔹 Backend
- Java 17
- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- Keycloak (RBAC & Identity Provider)
- JWT Token-based Authentication

### 🔹Infrastructure
- Spring Cloud Gateway (API Gateway)
- Spring Eureka Server (Service Discovery)
- Maven (Build Tool)

### 🔹 Database
- MySQL 8.x

---

## 🧱 Architecture

The application is structured following a microservices-based architecture. Each feature or domain is encapsulated in its own independent Spring Boot microservice, and these services communicate over RESTful APIs. The system is designed for scalability, modularity, and maintainability.

The frontend, built with Angular, acts as a single-page application (SPA) that communicates with backend services via an API Gateway. The API Gateway (Spring Cloud Gateway) routes incoming requests to the appropriate microservices, applies security filters, and handles CORS and load balancing.

Authentication and authorization are managed using Keycloak. It provides single sign-on (SSO). Users authenticate through Keycloak, which issues JWT tokens. These tokens are then used by each microservice to validate user access via Spring Security. Role-based access control ensures that only authorized users can access specific functionalities.

A Eureka Server is used for service discovery. All microservices register themselves with Eureka, which allows dynamic discovery and routing without hardcoding service endpoints. This enables seamless communication between services and facilitates load balancing and fault tolerance.

Each microservice manages its own MySQL database, following the Database-per-Service pattern. This ensures data isolation, reduces coupling, and simplifies independent scaling of services. Spring Data JPA is used to abstract and manage database access.

The services include:

- **User Service**: Manages users and roles.
- **Project/Deliverables Service**: Manages projects, tasks, and timelines.
- **Resource Service**: Manages tools, materials, and equipment.
- **Document Service**: Handles file uploads, storage, and versioning.
- **Insurance Service**: Tracks policies and related documents.
- **Finance Service**: Manages budgets, expenses, and financial reports.
- **Environment Service**: Monitors compliance and risk data.
- **Employee Service**: Manages personnel and attendance.
- **Complaint Service**: Handles user feedback and issues.

This architecture ensures that the application is robust, secure, and ready for deployment in cloud-native environments. Each service can be containerized using Docker for deployment and orchestration in scalable infrastructure setups.

---

## ⚙️ Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/construction-management-app.git

