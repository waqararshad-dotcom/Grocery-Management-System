# Grocery-Management-System
A production-ready full-stack web application architected using the **MERN (MongoDB, Express.js, React, Node.js)** technology stack. This application digitalizes daily supermarket operations, automates point-of-sale (POS) grocery checkout calculations, tracks systematic invoice logs, and offers store managers an administrative control grid to execute stock refinement.

---

## 🚀 Core Features & Design Modules
* **Digital Grocery Aisle:** Renders dynamic lists of products and daily essentials stored within MongoDB databases.
* **Responsive Search Optimization:** Instantly filters grocery categories on the client side without executing page reloads.
* **Point-of-Sale Automated Billing:** Dynamically maps out item states inside a virtual shopping basket and generates automated final cost computations.
* **Persistent Invoices History:** Logs generated cash counter transactions with structured string lists and system timestamps.
* **Administrative Inventory Purging:** Provides designated store administrators the utility to execute asynchronous `HTTP DELETE` data-wiping requests.

---

## 🛠️ Technical Stack Specifications
* **Frontend UI Layout:** React.js (Compiled using Vite Framework)
* **HTTP Client:** Axios API Requests Handler
* **Backend Runtime Configuration:** Node.js paired with Express.js REST API routes
* **Database Management Architecture:** MongoDB Schema models using Mongoose ODM

---

## 💻 Local Installation & Setup Guide

### 1. Backend Configuration
1. Navigate to the backend directory:
   ```bash
   cd backend
Install the necessary dependencies:

Bash
npm install
Run the Node.js server setup:

Bash
node index.js
2. Frontend Configuration
Open a new terminal and navigate to the frontend directory:

Bash
cd frontend
Install the React local environment packages:

Bash
npm install
Start the Vite local development server:

Bash
npm run dev
📂 Project Directory Map
Plaintext
GroceryManagementSystem/
│
├── backend/
│   ├── index.js             # Main Express server and MongoDB cluster routing
│   ├── package.json         # Server-side module listings config
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Primary UI Views, logic modules, and interfaces
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json         # Front-end asset structures config
│   └── vite.config.js
│
└── README.md                # System documentation architecture
