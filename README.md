# Kotio UI v3 - Smart Home Dashboard

A application that provides a modern web interface for monitoring and controlling
various IoT devices and smart home sensors.

Built with Express.js, TypeScript, HTMX, and Tailwind CSS.

## Overview

Kotio UI v3 is a responsive web dashboard that integrates with multiple IoT
backends to display and control:

- **Lights**: Monitor and control ikea dirigera lights with on/off status and last seen timestamp
- **Smart Devices**: Manage Tellstick devices with on/off control
- **Sensors**: Display environmental data from Dirigera sensors (temperature, humidity, air quality)
- **Ruuvitag Sensors**: Show data from ruuvitag sensors (temperature, humidity, pressure)
- **Water Sensors**: Monitor ikea dirigera water sensor data
- **Air Quality**: Track ikea dirigera air quality metrics (PM2.5, VOC levels)
- **Cameras**: Control Tapo camera privacy settings
- **Magnets**: Display ikea dirigera door/window sensor status

## Tech Stack

- **Backend**: Node.js with Express.js (v5.0.0)
- **Language**: TypeScript (ES2020 target)
- **Frontend**: HTMX + Tailwind CSS
- **Templating**: Pug
- **Testing**: Vitest + Supertest
- **Code Quality**: TypeScript, Oxlint
- **Accessibility**: Pa11y
- **Configuration**: dotenv

## Prerequisites

- Node.js (v18+)
- npm or yarn

## Getting Started

### Installation

```bash
# Clone the repository (if applicable)
cd ui-v3

# Install dependencies
npm install
```

### Development Setup

1. Copy `.env.example` to `.env` (or create `.env` with defaults):

```bash
# Application Configuration
PORT=3000

# API Endpoints
API_DIRIGERA_BASE=http://localhost:8000
API_TELLSTICK_BASE=http://localhost:5001
API_RUUVITAG_BASE=http://localhost:3102
API_TAPO_CAMERA_BASE=http://localhost:5020
```

2. Start the development server with auto-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Running the Application

### Development Mode (with hot reload via nodemon)

```bash
npm run dev
```

### Production Build and Run

```bash
# Build TypeScript to dist/
npm run build

# Run production server
npm start
```

## Testing

### Run Tests (Watch Mode)

```bash
npm test
```

### Run Tests Once

```bash
npm test -- --run
```

### Test Coverage Report

```bash
npm run coverage
```

## Code Quality

### Linting with Oxlint

```bash
npm run lint
```

### Accessibility Testing with Pa11y

Test specific pages:

```bash
npx pa11y http://localhost:3000
```

## Configuration

The application uses environment variables for runtime configuration via `.env` file.

### Supported Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `API_DIRIGERA_BASE` | http://localhost:8000 | Dirigera sensor API base URL |
| `API_TELLSTICK_BASE` | http://localhost:5001 | Tellstick device API base URL |
| `API_RUUVITAG_BASE` | http://localhost:3102 | Ruuvitag sensor API base URL |
| `API_TAPO_CAMERA_BASE` | http://localhost:5020 | Tapo camera API base URL |

**Note**: The application includes a environment variable`USE_FAKE=true` to
use mock/fake data instead of calling real APIs. This is useful for development
without running backend services.

## Project Structure

```
ui-v3/
├── bin/                    # Application bootstrap
│   └── www.ts             # Express server entry point
├── routes/                # Express route handlers
├── views/                 # Pug templates
├── public/                # Static assets
├── test/                  # Test files
├── config.ts              # Configuration module
├── app.ts                 # Express app setup
├── tsconfig.json          # TypeScript configuration
├── vitest.config.ts       # Vitest configuration
├── package.json           # Dependencies
└── README.md              # This file
```

## Development Notes

### TypeScript Compilation

- **Target**: ES2020
- **Output**: `dist/` directory with source maps
- **Declaration Files**: Generated for type safety
- **Module System**: ES modules (import/export)

### Testing Best Practices

- **Test Framework**: Vitest with globals enabled (`describe`, `it`, `expect`)
- **HTTP Testing**: Supertest for testing Express routes
- **API Mocking**: Nock for mocking HTTP requests
- **Test Location**: `test/routes/{resource}.test.ts` mirrors `routes/{resource}.ts`

### Error Handling

- Global error handler in `app.ts` catches 404s and errors
- Errors render error template with appropriate HTTP status codes
- All fetch operations include error catching

## Code Conventions

### Naming Conventions

- **Functions**: camelCase (`getUserData`, `fetchLights`)
- **Constants**: UPPER_SNAKE_CASE (`API_KEY`, `MAX_RETRIES`)
- **Files**: snake_case (`water_sensors.ts`)
- **Test files**: `.test.ts` suffix

### Route Patterns

Each route file follows this structure:
1. Export types (`InputLight`, `Light`)
2. Define fake/mock data
3. Create data transformation functions
4. Implement async route handlers with error handling
5. Export Express router

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [HTMX Documentation](https://htmx.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pug Documentation](https://pugjs.org/)
- [Vitest Documentation](https://vitest.dev/)

## Development

For AI-assisted development, refer to `AGENTS.md` for project-specific conventions and workflows.


