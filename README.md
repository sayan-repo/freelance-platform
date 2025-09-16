FreelanceHub: A Full-Stack Freelance Platform

Welcome to FreelanceHub, a modern, full-stack freelance marketplace designed to connect clients with talented freelancers in a secure and efficient environment. This application is built with a React frontend, a Node.js/Express backend, and features a robust set of functionalities including role-based authentication, project and bid management, and a complete dispute arbitration system.

This prototype is currently running with a mock in-memory backend, making it easy to set up and test without requiring a database.
Core Features Implemented

    Role-Based Authentication: Separate login and registration flows for Clients, Freelancers, and Arbitrators (Admins).
    Job Posting System: Authenticated clients can post detailed project listings with budgets, deadlines, and required skills.
    Bidding System: Authenticated freelancers can browse posted projects and place competitive bids with detailed proposals.
    Project Lifecycle Management: Clients can accept bids, which transitions the project status from posted to in_progress.
    Role-Specific Dashboards: Each user role (Admin, Client, Freelancer) has a dedicated dashboard displaying relevant statistics and actions.
    Dispute Management System: A complete arbitration workflow where clients or freelancers can file a dispute on a project, which can then be reviewed and resolved by an Admin/Arbitrator.
    Conditional Wallet Integration: Logged-in users can connect their MetaMask wallet. (Payment functionality is prototyped).
    Fully Responsive UI: The user interface is built with Tailwind CSS and is responsive across all screen sizes, from mobile to desktop.

Technology Stack
Backend

    Runtime: Node.js
    Framework: Express.js
    Authentication: JSON Web Tokens (JWT) & bcrypt for password hashing
    Database (Prototype): In-Memory data store (data/store.js)
    Blockchain (Starter): Hyperledger Fabric chaincode template

Frontend

    Library: React
    Build Tool: Vite
    Routing: React Router v6
    Styling: Tailwind CSS
    State Management: React Context API
    Forms: React Hook Form
    API Communication: Axios
    Notifications: React Toastify

How to Run the Web Application

To get the application running on your local machine, you need to run the backend and frontend servers simultaneously in two separate terminals.
Prerequisites

    Node.js (v18 or later)
    NPM or another package manager
    A code editor like VS Code

Step 1: Backend Setup

    Navigate to the backend directory:

    cd backend/

    Install dependencies:

    npm install

    Create the environment file: Create a new file named .env in the backend/ directory and paste the following content into it:

    PORT=5000
    JWT_SECRET=this-is-a-super-secret-key-for-development-and-it-must-be-present
    JWT_EXPIRY=7d

    Start the backend server:

    npm run dev

    The terminal should show a confirmation message: ✅ Backend server running on http://localhost:5000. Leave this terminal running.

Step 2: Frontend Setup

    Open a new terminal.

    Navigate to the frontend directory:

    cd frontend/

    Install dependencies:

    npm install

    Create the environment file: Create a new file named .env in the frontend/ directory and paste the following content into it. This tells the frontend where to find the backend API.

    VITE_API_URL=http://localhost:5000/api

    Start the frontend server:

    npm run dev

    The terminal will provide a local URL, typically http://localhost:5173/.

Step 3: View the Application

Open your web browser and navigate to http://localhost:5173/. You should now see the FreelanceHub homepage.
Application Workflow & Functionalities

Here’s how to test the core features of the application using the pre-defined mock users.
Default User Credentials:

    Admin/Arbitrator: admin@example.com / adminpass
    Client: client@example.com / clientpass
    Freelancer: jane@example.com / freelancerpass

Workflow 1: Posting and Bidding on a Project

    Log in as the Client. You will be redirected to the Client Dashboard.
    Click the "Post a New Project" button and fill out the form to create a new job. Upon submission, you will be redirected to the new project's detail page.
    Log out.
    Log in as the Freelancer. Navigate to "Browse Projects" from the header.
    Find the project you just created and click on it.
    On the project detail page, fill out the "Place Your Bid" form in the sidebar and submit. You will see your bid appear in the list.

Workflow 2: Accepting a Bid

    Log out.
    Log in as the Client.
    Navigate to the detail page of the project you created.
    In the bids list, you will see the freelancer's bid and an "Accept Bid" button. Click it.
    The page will refresh, the project's status will change to In Progress, and the button will disappear.

Workflow 3: Dispute and Arbitration

    As either the Client or the hired Freelancer, navigate to a project that is In Progress or Completed.
    In the sidebar, a "Project Conflict" card will be visible. Click the "Raise a Dispute" button and fill out the form.
    The project's status will change to Disputed.
    Log out.
    Log in as the Admin. A "Disputes" link will now be visible in the header. Click it.
    On the Disputes page, the admin can see all open disputes and has buttons to resolve them, completing the arbitration workflow.
