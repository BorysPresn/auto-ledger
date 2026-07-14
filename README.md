# Auto Ledger

Auto Ledger is a web application for tracking fuel consumption, refueling
history, mileage, and fuel expenses.

The project is currently under active development.

## Project Structure

```text
auto-ledger/
|-- apps/
|   |-- api/       Express and TypeScript API
|   `-- web/       React, TypeScript, and Vite frontend
|-- package.json  npm workspace configuration
`-- README.md
```

## Requirements

- Node.js
- npm

## Installation

Install all workspace dependencies from the repository root:

```bash
npm install
```

## Development

Start the frontend development server from the repository root:

```bash
npm run dev:web
```

Start the API development server from the repository root:

```bash
npm run dev:api
```

## Available Scripts

- `npm run dev:web` starts the frontend development server.
- `npm run dev:api` starts the API development server.
- `npm run build` builds all workspace applications that provide a build script.
- `npm run lint` runs linting for all workspace applications that provide a lint script.

## Endpoints

### API Health Check

`GET http://localhost:3000/api/health` - Returns `{"status": "ok"}` when the API is running correctly.