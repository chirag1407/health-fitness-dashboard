# Health & Fitness Dashboard

A modern, responsive health and fitness tracking dashboard built with Next.js, TypeScript, and TailwindCSS.

![Health & Fitness Dashboard](https://example.com/dashboard-preview.png)

## Features

- 📊 Interactive charts and statistics for health metrics
- 🏋️ Workout tracking and history
- 🍎 Nutrition and meal tracking
- 💧 Water intake monitoring
- 📱 Fully responsive design for all devices

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Data visualization
- [Chart.js](https://www.chartjs.org/) - Data visualization
- [Lucide Icons](https://lucide.dev/) - Modern icon set
- [date-fns](https://date-fns.org/) - Date manipulation

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/health-fitness-dashboard.git
cd health-fitness-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router
│   ├── components/     # UI Components
│   │   ├── charts/     # Chart components
│   │   ├── dashboard/  # Dashboard-specific components
│   │   ├── layout/     # Layout components
│   │   └── ui/         # Reusable UI components
│   ├── context/        # React Context providers
│   ├── data/           # Mock data (replace with API)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── types/          # TypeScript type definitions
└── tailwind.config.js  # TailwindCSS configuration
```

## Customization

### Adding Your Own Data

Currently, the dashboard uses mock data located in `src/data/mock-data.ts`. To connect to a real API:

1. Create API service functions in `src/lib/api.ts`
2. Update the HealthContext to fetch data from your API
3. Implement authentication if needed

### Theme Customization

The project uses TailwindCSS for styling. You can customize colors, spacing, and other design tokens in `tailwind.config.js`.

## License

This project is available under the MIT License.

## Acknowledgements

- Design inspired by modern health and fitness applications
- Icons provided by [Lucide Icons](https://lucide.dev/)
