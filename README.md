# فطرة - Fitra Mobile App

A modern Quran memorization app built with Next.js, featuring AI-powered learning techniques and gamification elements.

## Features

- **Interactive Memorization Journey**: Multi-stage learning process (Listen, Repeat, Read, Write)
- **Progress Tracking**: Visual progress maps and achievement system
- **Gamification**: Points, streaks, lives, and leaderboards
- **Personalized Learning**: Customizable daily goals and learning preferences
- **Arabic RTL Support**: Full right-to-left layout with Arabic fonts
- **Responsive Design**: Mobile-first design with beautiful animations

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom Arabic typography
- **UI Components**: Radix UI primitives with shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Run the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

\`\`\`
app/
├── dashboard/          # Main dashboard page
├── memorization/       # Interactive memorization interface
├── examination/        # Quiz and testing system
├── evaluation/         # Performance evaluation
├── progress-map/       # Visual progress tracking
├── leaderboard/        # Community rankings
├── login/             # Authentication
├── setup/             # Initial user setup
├── globals.css        # Global styles and Arabic fonts
└── layout.tsx         # Root layout with RTL support

components/ui/         # Reusable UI components
lib/                   # Utility functions
public/images/         # Static assets and logos
\`\`\`

## Key Features

### 🎯 Memorization System
- **4-Stage Learning**: Listen → Repeat → Read → Write
- **Word-by-word highlighting** during reading stage
- **Voice recognition** for recitation practice
- **Interactive writing** with guided templates

### 📊 Progress Tracking
- **Visual progress maps** with lesson nodes
- **Achievement badges** and completion rewards
- **Daily task tracking** with streak counters
- **Performance analytics** and improvement suggestions

### 🏆 Gamification
- **Points system** for completed activities
- **Lives mechanism** for quiz attempts
- **Daily streaks** to encourage consistency
- **Community leaderboards** with rankings

### 🎨 Design
- **Arabic-first design** with proper RTL layout
- **Beautiful gradients** and Islamic color palette
- **Smooth animations** with Framer Motion
- **Mobile-optimized** interface

## Customization

### Colors
The app uses a warm, Islamic-inspired color palette:
- Primary: `#AB5413` (Rich Brown)
- Secondary: `#764328` (Dark Brown)
- Accent: `#D7A96F` (Light Brown)
- Supporting: `#987B5E` (Medium Brown)

### Fonts
- **Almarai**: Modern Arabic font for UI elements
- **Arabic typography**: Optimized for Quranic text display

### Configuration
- Modify `tailwind.config.js` for design system changes
- Update `app/globals.css` for typography and animations
- Customize components in `components/ui/` directory

## Deployment

The app is ready for deployment on Vercel:

\`\`\`bash
npm run build
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
