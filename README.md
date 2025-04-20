# Health & Fitness Dashboard

A modern, responsive health and fitness tracking dashboard built with Next.js, TypeScript, and TailwindCSS.

## Features

- 📊 Interactive charts and statistics for health metrics
- 🏋️ Workout tracking and history
- 🍎 Nutrition and meal tracking
- 💧 Water intake monitoring
- 🌗 Light/Dark theme toggle
- 📱 Fully responsive design for all devices

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/) - Data visualization
- [Lucide Icons](https://lucide.dev/) - Modern icon set
- [date-fns](https://date-fns.org/) - Date manipulation

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/chirag1407/health-fitness-dashboard.git
   cd health-fitness-dashboard
   ```
2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

### Running Locally

#### Development Mode
```bash
npm run dev
# or
yarn dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

#### Production Build
To simulate deployment locally:
```bash
npm run build
npm start
```
If port 3000 is in use, you can run:
```bash
PORT=3001 npm start
```

### Troubleshooting
- If you see `EADDRINUSE: address already in use :::3000`, stop the process using port 3000 or use a different port as shown above.
- Ensure all dependencies are installed and your Node.js version is compatible.

## Project Structure

- `src/app/` - Next.js app directory (pages, layout, global styles)
- `src/components/` - Reusable UI and dashboard components
- `src/context/` - React context providers (theme, health data)
- `src/data/` - Mock data for workouts, nutrition, etc.
- `src/types/` - TypeScript type definitions
- `public/` - Static assets (images, icons)

## Deployment

This project is ready for deployment on platforms like Vercel. The build process runs linting and type checks, so ensure there are no unused imports or TypeScript errors before deploying.

---

Feel free to open issues or contribute to this project!
