# SkillX - Student-Company Matching Platform

A complete React prototype for connecting students with companies while helping students develop their skills through personalized learning roadmaps.

## Features

- **Landing Page** - Attractive homepage with hero section and features
- **Authentication** - Mock login with GitHub, Google, LinkedIn (simulated)
- **Student Flow**:
  - Skills selection
  - Skills assessment quiz
  - Personalized learning roadmap
  - Video and coding tasks
  - Job applications
  - Student dashboard with progress tracking
  - Community feed
  - Messaging system
  - Leaderboard
  - Profile management

- **Company Flow**:
  - Company dashboard
  - Post jobs
  - View applications
  - Accept/Reject applicants
  - Send messages to applicants

- **Additional Features**:
  - Notifications system
  - Chatbot assistant
  - Responsive design (mobile, tablet, desktop)

## Tech Stack

- React 18+ with Vite
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Recharts for dashboard charts
- Context API for state management
- localStorage for data persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── auth/          # Authentication components
│   ├── student/       # Student-specific components
│   ├── company/       # Company-specific components
│   ├── jobs/          # Job-related components
│   ├── shared/        # Shared components (Navbar, Button, etc.)
│   └── landing/       # Landing page components
├── context/           # React Context providers
├── data/              # Mock data files
├── pages/             # Page components
├── utils/             # Utility functions
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## Usage

### As a Student:
1. Click "Login" on the landing page
2. Select a login method (GitHub, Google, or LinkedIn)
3. Choose "I'm a Student"
4. Fill out the signup form
5. Select your skills
6. Take the skills assessment quiz
7. View your personalized roadmap
8. Complete tasks and apply for jobs!

### As a Company:
1. Click "Login" on the landing page
2. Select a login method
3. Choose "I'm a Company"
4. Fill out the company signup form
5. Post jobs and manage applications

## Notes

- This is a **prototype** - all data is stored in localStorage
- No real authentication - login is simulated
- Videos are simulated with timers
- Code validation is basic (keyword checking)
- All interactions use mock data

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

This is a prototype project for demonstration purposes.


