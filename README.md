# Student Management Application

This project is a simple student management application built with Node.js for the backend and React.js for the frontend. It allows users to add student details to a MongoDB database and search for students by name.

## Features
- **Add a Student**: Enter details such as name, age, date of birth (DOB), branch, email, and phone number to add a student to the database.
- **Search Student**: Search for a student by name and view their details if found.
- **UI**: Simple and interactive UI with buttons for adding and searching students.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Docker**: Containerization for backend and MongoDB
- **Environment Variables**: Used .env files to manage configuration

## Architecture

![Architecture](./Full_Stack_Student_Management_Application_Architecure.jpg)

## Setup Instructions

### Prerequisites
- Node.js installed locally
- Docker installed locally (optional, for running MongoDB in a container)

### Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/GadagojuShiva/fullstack_student_management_application.git
    cd student-management
    ```

2. Install dependencies:
    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. Set up environment variables:
    - Rename `.env.sample` to `.env` in the `backend` directory.
    - Configure your MongoDB URI in the `.env` file:
    ```env
    MONGO_URI=
    PORT=5000
    ```

4. Run the application:

    **Option 1: Using Docker (recommended for MongoDB):**
    ```bash
    docker-compose up --build
    ```
    This command will build the Docker images and start the containers for the backend and MongoDB.

    **Option 2: Run backend and frontend separately:**
    ```bash
    # In the backend directory
    npm start

    # In the frontend directory
    npm start
    ```

5. Access the application:
    - Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

# Here are Some Snapshots of the application

![Frontend](./Screen_Capture_of_Application/1.png)
![Frontend](./Screen_Capture_of_Application/2.png)
![Backend](./Screen_Capture_of_Application/3.png)
![Frontend](./Screen_Capture_of_Application/4.png)
![Backend](./Screen_Capture_of_Application/5.png)

## Usage
- Click on **Add a Student** to fill out the student details form and submit.
- Click on **Search Student** to search for a student by name.

## Contributing
Contributions are welcome! Feel free to open issues and pull requests.

