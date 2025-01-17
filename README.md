# CodeZen

CodeZen is a LeetCode clone designed to provide users with an interactive platform to practice and enhance their coding skills. Built with a robust technology stack, CodeZen offers a seamless and efficient user experience.

## Features

- **User Authentication**: Secure sign-up and login functionalities powered by Google Firebase.
- **Problem Solving**: A diverse set of coding problems across various difficulty levels.
- **Code Editor**: Integrated code editor with syntax highlighting and real-time code execution.
- **Progress Tracking**: Monitor your problem-solving journey and performance metrics.

## Technology Stack

- **Frontend**: React.js for building a dynamic and responsive user interface.
- **Backend**: Node.js with Express.js to handle server-side logic and API endpoints.
- **Database**:
  - PostgreSQL managed with Prisma ORM for relational data management.
  - MongoDB for handling non-relational data storage.
- **Caching**: Redis for efficient data caching and improved performance.
- **Authentication**: Google Firebase Authentication for secure user management.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/RynoCODE/CodeZen-MERN.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd CodeZen-MERN
   ```

3. **Install dependencies for both frontend and backend**:

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**:

   Create a `.env` file in both the `backend` and `frontend` directories with the necessary configuration settings. Refer to `.env.example` files for the required variables.

5. **Start the development servers**:

   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend server
   cd frontend
   npm start
   ```

The application should now be running locally. Access the frontend at `http://localhost:3000` and the backend at `http://localhost:5000`.

## Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Submit a pull request detailing your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

Special thanks to the open-source community and the developers of the technologies used in this project.

---

For more information, visit the [CodeZen GitHub repository](https://github.com/RynoCODE/CodeZen-MERN).
