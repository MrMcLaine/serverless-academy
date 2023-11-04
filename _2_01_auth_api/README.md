# Auth API

Simple REST API for user registration and authentication using JWT.

## Quick Start

1. Clone the repository:
   ```sh
   git clone https://github.com/MrMcLaine/serverless-academy.git
   git checkout master
   cd _2_01_auth_api
   
2. Connect Docker
    **Make sure Docker is running on your machine.
    ```sh
    docker-compose up -d
3. Install dependencies:
    ```sh
    npm install
   
4. Environment Variables
   Copy the .env.example file to a .env file and fill in the details as per your development setup.
5. Run the application in development mode
    ```sh
    npm run dev
   
***
## API Endpoints

Below are the `curl` commands to interact with the API endpoints.

### Register

To register a new user, send a POST request to the `/auth/sign-up` endpoint with the user's email and password:

```sh
curl -X POST http://localhost:3000/auth/sign-up \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "password123"}'
```

### Login
To log in an existing user, send a POST request to the /auth/sign-in endpoint with the user's email and password:
```sh
curl -X POST http://localhost:3000/auth/sign-in \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "password123"}'
```

### Get Current User
To get the current authenticated user's details, send a GET request to the /me endpoint with a valid JWT in the Authorization header:
```sh
curl -X GET http://localhost:3000/me \
-H "Authorization: Bearer <ACCESS_TOKEN>"
```
Replace <ACCESS_TOKEN> with the JWT provided upon successful login.