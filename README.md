# Appointment Scheduling Application

## Project Overview

This is a full-stack appointment scheduling application consisting of a backend API and a frontend web client. The backend is built with Node.js, Express, and TypeScript, providing RESTful API endpoints for managing appointments, availability, holidays, and users. The frontend is a React application built with TypeScript, offering a user-friendly interface for booking and managing appointments.

---

## Backend

### Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB (assumed from typical stack, please adjust if different)
- JWT for authentication
- Multer for file uploads
- Express Validator for input validation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or remote)

### Installation & Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory with necessary environment variables such as:

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ```

4. Build the TypeScript code:

   ```bash
   npm run build
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

### Development

- To run the backend in development mode with hot reload:
  ```bash
  npm run dev
  ```

---

## Frontend

### Technologies Used

- React
- TypeScript
- Vite (build tool)
- React Router (assumed from pages and layouts)
- Redux Toolkit (assumed from store directory)

### Installation & Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:3000`).

---

## Running the Project

1. Start the backend server as described above.
2. Start the frontend development server as described above.
3. Use the frontend application to interact with the backend API for booking and managing appointments.

---

## Project Structure

### Backend

- `app/` - Contains modules for appointments, availability, holidays, users, and common utilities.
- `index.ts` - Entry point for the backend server.
- `package.json` - Backend dependencies and scripts.
- `tsconfig.json` - TypeScript configuration.

### Frontend

- `src/components/` - React components used throughout the app.
- `src/pages/` - Page components for routing.
- `src/services/` - API service calls.
- `src/store/` - Redux store and slices.
- `src/layouts/` - Layout components for different user roles.
- `package.json` - Frontend dependencies and scripts.
- `vite.config.ts` - Vite configuration.

---

## API Endpoints

The backend exposes RESTful API endpoints for managing appointments, availability, holidays, and users. Some key endpoints include:

- `POST /api/appointments` - Create a new appointment
- `GET /api/appointments` - Get all appointments
- `PUT /api/appointments/:id` - Update an appointment
- `DELETE /api/appointments/:id` - Delete an appointment

- `GET /api/availability` - Get availability slots
- `POST /api/availability` - Create availability slots

- `GET /api/holidays` - Get holidays
- `POST /api/holidays` - Create holidays

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login

Please refer to the backend source code for the full list of endpoints and their usage.

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

---

## License

This project is licensed under the MIT License.

---

## Author

Aayush Sharma
