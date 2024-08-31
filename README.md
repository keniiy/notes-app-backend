# Notes API

Welcome to the Notes API, a simple service built using the NestJS framework. This API allows users to create, retrieve, and delete notes, like any other basic note-taking application.

## Features

- **Create Notes**: Add new notes with a title and content.
- **Retrieve Notes**: Fetch all notes with pagination support or retrieve a single note by its ID.
- **Delete Notes**: Remove a note by its ID.
- **API Documentation**: Easily accessible Swagger UI documentation for all available endpoints.
- **Basic Authentication**: Secured API documentation with basic authentication.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v14.x or higher
- **pnpm**: v7.x or higher (If you don’t have pnpm, install it globally using npm: `npm install -g pnpm`)
- **MongoDB**: A running MongoDB instance (local or remote)

## Setup Instructions

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/yourusername/notes-api.git
cd notes-api
```



### 2. Install Dependencies

Install all necessary dependencies using pnpm:

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a .env file in the root of the project directory with the following content:

```plaintext
# Application Port
PORT=3000

# Environment
NODE_ENV=development

# Swagger Configuration
SWAGGER_TITLE=Notes API
SWAGGER_DESCRIPTION=API documentation for the Notes service
SWAGGER_VERSION=1.0
SERVICE_NAME=notes

# Swagger Basic Authentication
SWAGGER_USER=admin
SWAGGER_PASSWORD=password

# Production CORS Origin (For production environment)
PRODUCTION_ORIGIN=https://your-production-domain.com

# Database URI
DATABASE_URL=your-mongodb-connection-string

# Throttle Setup
THROTTLE_TTL=60
THROTTLE_LIMIT=10
```

Replace your-mongodb-connection-string with your actual MongoDB connection URI.

### 4. Running the Application

You can run the application in different modes depending on your environment:

### Development Mode

To start the app in development mode (with hot-reload):

```bash
pnpm run start:dev
```

### Production Mode

To run the app in production mode:

```bash
pnpm run start:prod
```

### 5. Accessing the API

Once the application is running, you can access the API at http://localhost:3000.

### 6. API Documentation

The API documentation is available at http://localhost:3000/api. You’ll need to authenticate using the Swagger credentials provided in the .env file (SWAGGER_USER and SWAGGER_PASSWORD).

## Testing

The application includes some pre-built tests to ensure the basic functionality is working as expected. However, a complete testing setup is not yet implemented.

### Pre-Built Tests

The application comes with a few pre-built unit and end-to-end tests to help verify basic operations.

### Running Pre-Built Tests

You can run the existing tests using the following commands:

#### Run Unit Tests

```bash
pnpm run test
```

### Troubleshooting

If you encounter any issues during setup or while running the application, consider the following:

	•	Ensure MongoDB is running: Make sure your MongoDB instance is accessible and the connection string in .env is correct.
	•	Check Node.js and pnpm versions: Ensure you are using the correct versions of Node.js and pnpm.

### Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue happy coding ;)