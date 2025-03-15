# The Recipe Book

A full-stack application using **Nest.js** for the backend and **Next.js** for the frontend.

## Installation

To set up the project locally, follow these steps for both the **backend** (Nest.js) and **frontend** (Next.js) parts of the application.

### Backend (Nest.js)

In the backend/ directory, create a .env file with the following variables:

```bash
PORT=
API_URL=
CORS_ORIGIN=
```

### Frontend (Next.js)

In the frontend/ directory, create a .env file with the following variables:

```bash
NEXT_PUBLIC_API_URL=
```

To run the full application:

Start the backend:

```bash
cd backend
npm install
npm run start:dev
```

Start the frontend:

```bash
cd frontend
npm install
npm run dev
```
