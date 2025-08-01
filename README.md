# TitheSpace - Church Management System

A modern, production-ready church management system built with React, Vite, TypeScript, and Firebase. Designed specifically for Nigerian churches and other African congregations.

## Features

- **Authentication**: Secure user registration and login with Firebase Auth
- **Church Setup**: Complete church profile configuration
- **Member Management**: Track congregation members, baptisms, and cell group assignments
- **Service Management**: Schedule and track church services and events
- **Financial Management**: Record tithes, offerings, and expenses with detailed reporting
- **Cell Groups**: Manage small groups and track growth
- **Departments**: Organize church ministries and departments
- **Real-time Data**: All data synced in real-time with Firebase Firestore
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Nigerian Context**: Built with Nigerian church operations in mind

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Tailwind CSS, Radix UI, shadcn/ui
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project with Firestore and Authentication enabled

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd tithespace-react-vite
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication with Email/Password provider
   - Create a Firestore database
   - Get your Firebase configuration from Project Settings

4. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration:
   \`\`\`env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Build for production**
   \`\`\`bash
   npm run build
   \`\`\`


\`\`\`

## Usage

1. **Sign Up**: Create an account with your email and password
2. **Church Setup**: Complete your church profile with basic information
3. **Dashboard**: View your church's key metrics and recent activity
4. **Add Members**: Start adding your congregation members
5. **Schedule Services**: Create and manage church services
6. **Track Finances**: Record tithes, offerings, and expenses
7. **Manage Groups**: Organize cell groups and departments

## Project Structure

\`\`\`
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── Login.tsx       # Login form
│   ├── Signup.tsx      # Registration form
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── lib/                # Utility libraries
│   ├── firebase.ts     # Firebase configuration
│   ├── db.ts          # Database operations
│   └── utils.ts       # Utility functions
├── types/              # TypeScript type definitions
│   └── index.ts       # Main types
└── main.tsx           # Application entry point
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email goodnewsanwana14@gmail.com or create an issue in this repository.

## Acknowledgments

- Built with love for the Nigerian church community
- Inspired by the need for affordable church management solutions
- Thanks to all contributors and beta testers
