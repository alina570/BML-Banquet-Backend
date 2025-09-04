# Event Booking System

This is a full-stack MERN (MongoDB, Express, React, Node.js) application for managing event bookings. The system allows users to create events, book or cancel bookings, and perform CRUD operations on events with authentication and authorization.

---

## Features

### Backend

- **Schemas**:
  - `User`: For user authentication and authorization.
  - `Event`: For storing event details, booked seats, and user bookings.
- **Authentication and Authorization**: Implemented using `passport-local-mongoose` and `express-session`.
- **Middlewares**: Used for authentication to protect routes and ensure only authorized users can perform specific actions.
- **Schema Validation**: Joi is used for validating input data to ensure reliability and consistency.
- **Error Handling**: Returns meaningful error messages to the frontend.
- **Event Booking**: Users can book or cancel seats for events.
- **Email Notifications**: A confirmation email is sent to the user's Gmail upon booking an event.

### Frontend

- **React**: For a responsive and beautiful user interface.
- **React-Toastify**: For displaying error and success messages.
- **Dynamic UI**: Shows edit and delete options only to the event creators.
- **My Bookings Page**: Allows users to view their booking history and cancel bookings.
- **Event Listing**: Users can list their created events for others to view and book.

---


## API Endpoints

### Users

- **Register**: `POST /api/signup`
- **Login**: `POST /api/login`
- **Logout**: `GET /apilogout`

### Events

- **Create Event**: `POST /api/events` (Authenticated)
- **Read Events**: `GET /api/events`
- **Update Event**: `PUT /api/events/:eventId` (Only the creator)
- **Delete Event**: `DELETE /api/events/:eventId` (Only the creator)

### Booking

- **Book Seat**: `POST /api/events/:eventId/book`
- **Cancel Booking**: `POST /api/events/:eventId/cancel`

---

## Frontend Functionality

### Authentication

- Registration and login forms with error handling.
- Access to CRUD and booking features is restricted based on user roles and authentication.

### Event Management

- A dashboard for viewing, creating, editing, and deleting events.
- Conditional UI to show edit and delete options only to the event creator.
- Users can list their created events for others to view and book.

### Booking

- Users can book a seat for an event and cancel their booking.
- Real-time feedback using React Toast for successful or failed operations.
- Confirmation emails are sent to the user upon booking an event.

### My Bookings Page

- A dedicated page to view the user's booking history.
- Options to cancel bookings directly from the booking history.

---

## Technologies Used

### Backend

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **Passport.js** for authentication
- **Express-Session** for session management
- **Joi** for schema validation
- **Nodemailer** for sending emails

### Frontend

- **React.js**
- **React Toastify** for notifications
- **Axios** for API requests
- **CSS** for styling

---


## Future Enhancements

- Add admin roles for managing all events.
- Implement payment integration for bookings.

---

## Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Navigate to the backend folder:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file:

   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-uri>
   SESSION_SECRET=<your-session-secret>
   EMAIL_SERVICE=<your-email-service>
   EMAIL_USER=<your-email-address>
   EMAIL_PASS=<your-email-password>
   ```

5. Start the server:

   ```bash
   npm start
   ```

The backend will run at `http://localhost:8080`.

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

The frontend will run at `http://localhost:3000`.

---

## Contributing

If you'd like to contribute, feel free to fork the repository and submit a pull request.

---

## Author

This project is by Alina khan



