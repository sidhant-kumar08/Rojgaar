# Rojgaar

Rojgaar is a job portal built with the MERN stack, featuring an admin dashboard to manage jobs and users. It uses Redux for efficient state management and shadcn for a customizable UI. The platform allows users to search and apply for jobs, while admins can control listings and monitor applications.

## Features
- User registration and login
- Job search and application
- Admin dashboard for managing jobs and users
- Real-time notifications
- Integrated with Redux for state management
- Clean and customizable UI with shadcn components

## Tech Stack
- **Frontend**: React, Redux, Shadcn, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Cloudinary**: For image uploading and handling

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/sidhant-kumar08/rojgaar.git
    ```
2. Navigate to the project folder
    ```bash
    cd rojgaar
    ```
2. Navigate to the project frontend folder and install dependencies:
    ```bash
    cd frontend
    npm install
    ```
2. Navigate to the project backend folder and install dependencies:
    ```bash
    cd backend
    npm install
    ```
3. Set up environment variables for MongoDB, JWT secret, etc.

4. Start the frontend server:
    ```bash
    npm run dev
    ```
4. Start the backend server:
    ```bash
    node index.js or nodemon [index.js]
    ```
5. Frontend server will run on localhost:5173
5. backend server will run on localhost:4000

## Admin Panel
Admins can manage jobs, view applications, and control user access from the dedicated admin page.

## Contributing
Feel free to fork the repository and submit pull requests.

## License
This project is licensed under the MIT License.
