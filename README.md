# POS System

A Point of Sale (POS) system for Tomo's Coffee, built with a Python Flask backend and a React/Vite frontend.

## Tech Stack

*   **Backend:** Python, Flask, Flask-MySQL, Flask-JWT-Extended
*   **Frontend:** React, Vite, Tailwind CSS (assumed based on trends, or standard CSS)
*   **Database:** MySQL

## Prerequisites

Ensure you have the following installed:

*   [Python 3.8+](https://www.python.org/downloads/)
*   [Node.js & npm](https://nodejs.org/)
*   [MySQL Server](https://dev.mysql.com/downloads/mysql/)

## Installation & Setup

### 1. Database Setup

1.  Make sure your MySQL server is running.
2.  Create a database named `tomos_coffee`.
3.  Update the database credentials in `backend/app.py` if they differ from the defaults:
    *   **Host:** localhost
    *   **User:** root
    *   **Password:** Weka@
    *   **Database:** tomos_coffee

### 2. Backend Setup

Navigate to the `backend` directory and set up the Python environment.

```bash
cd backend
# Create a virtual environment (optional but recommended)
python -m venv venv
# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Seed the database (creates tables and initial data)
python setup_db.py
```

### 3. Frontend Setup

Navigate to the `frontend` directory and install dependencies.

```bash
cd frontend
npm install
```

## Running the Application

### Start the Backend

In the `backend` directory (with virtual environment activated):

```bash
python app.py
```

The backend server will start on `http://localhost:5001`.

### Start the Frontend

In the `frontend` directory:

```bash
npm run dev
```

The frontend application will start on `http://localhost:5173` (or the port shown in your terminal).

## Default Credentials

*   **Username:** admin
*   **Password:** password

## Project Structure

*   `backend/`: Flask application source code.
    *   `app.py`: Main application entry point.
    *   `setup_db.py`: Script to initialize database schema and seed data.
    *   `routes/`: API route definitions.
*   `frontend/`: React application source code.
    *   `src/`: Frontend source files.
