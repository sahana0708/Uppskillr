# 🎓 Uppskillr - Learning Management System

A modern, full-stack Learning Management System (LMS) built with Next.js 14, Express.js, MySQL, and Prisma ORM.

![Uppskillr Banner](https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=400&fit=crop)

## ✨ Features

- 🔐 **JWT Authentication** - Secure login/registration with refresh tokens
- 📚 **Course Management** - Browse subjects, sections, and videos
- 🎥 **Video Player** - YouTube integration with progress tracking
- 📊 **Progress Tracking** - Real-time progress saving and analytics
- 🔒 **Sequential Learning** - Videos unlock sequentially as you complete them
- 🤖 **AI ChatBot** - Intelligent assistant to help with course queries
- 🎨 **Modern UI** - Beautiful pink theme with Tailwind CSS
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Modern styling with custom pink theme
- **Zustand** - State management
- **Axios** - API client
- **react-youtube** - Video player
- **Lucide Icons** - Beautiful icons

### Backend
- **Node.js & Express.js** - RESTful API
- **TypeScript** - Type-safe backend
- **Prisma ORM** - Database management
- **MySQL 8.0** - Relational database
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MySQL 8.0 running locally
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd "Uppskillr LMS"
```

2. **Setup Database**
```sql
CREATE DATABASE lms_db;
```

3. **Install Backend Dependencies**
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MySQL credentials
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

4. **Install Frontend Dependencies** (new terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Running the Application

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

Both servers run simultaneously with hot reload enabled.

## 📁 Project Structure

```
Uppskillr LMS/
├── backend/                    # Express.js REST API
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── seed.ts            # Sample data seeder
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── middleware/        # Auth & error handling
│   │   ├── modules/           # Feature modules
│   │   │   ├── auth/         # Authentication
│   │   │   ├── users/        # User management
│   │   │   ├── subjects/     # Course management
│   │   │   ├── videos/       # Video management
│   │   │   └── progress/     # Progress tracking
│   │   ├── utils/             # Helper functions
│   │   ├── app.ts             # Express app setup
│   │   └── server.ts          # Server entry point
│   ├── .env                   # Environment variables
│   └── package.json
│
├── frontend/                   # Next.js application
│   ├── app/                   # App Router pages
│   │   ├── page.tsx          # Homepage
│   │   ├── layout.tsx        # Root layout
│   │   └── auth/             # Auth pages
│   ├── components/            # Reusable components
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── SubjectCard.tsx   # Course cards
│   │   ├── ChatBot.tsx       # AI assistant
│   │   └── ui/               # UI components
│   ├── lib/                   # Utilities
│   ├── store/                 # Zustand stores
│   ├── types/                 # TypeScript types
│   └── package.json
│
├── .gitignore                 # Git ignore rules
├── README.md                  # This file
├── QUICKSTART.md              # Quick start guide
└── UI_ENHANCEMENTS_SUMMARY.md # UI documentation
```

## 🎨 UI Theme

The application features a beautiful **pink and white** color scheme:

- **Primary**: `#ec4899` (Pink-500)
- **Secondary**: `#f472b6` (Pink-400)
- **Accent**: Purple gradients

## 📋 Key Features

### Authentication
- User registration with validation
- Secure login with JWT tokens
- Refresh token mechanism
- HTTP-only cookies

### Course System
- Browse available courses
- View course details and sections
- Sequential video unlocking
- Progress tracking per video

### Video Player
- YouTube video integration
- Auto-save progress every 10 seconds
- Resume from last position
- Auto-play next video
- Lock/unlock mechanism

### AI ChatBot
- Floating chat interface
- Instant responses to queries
- Course information
- Navigation guidance
- Help with platform features

## 🔧 Available Scripts

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npx prisma studio  # Open Prisma Studio
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📊 Database Schema

The application uses 6 main tables:

1. **User** - User accounts
2. **RefreshToken** - JWT refresh tokens
3. **Subject** - Course information
4. **Section** - Course sections
5. **Video** - Video content
6. **VideoProgress** - User progress tracking

## 🌟 Enhancements

Recent UI improvements include:
- ✨ Modern pink theme
- 🎨 Enhanced course cards with images
- 🤖 AI chatbot integration
- 🏠 Beautiful hero section
- 📱 Fully responsive design
- ⚡ Smooth animations

## 📖 Documentation

- `README.md` - Main documentation
- `QUICKSTART.md` - Quick start guide
- `UI_ENHANCEMENTS_SUMMARY.md` - UI details
- `API.md` - API reference (if created)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👥 Support

For issues or questions:
- Use the in-app ChatBot for quick help
- Check documentation files
- Create an issue on GitHub

## 🎯 Future Roadmap

- [ ] Dark mode toggle
- [ ] Course reviews and ratings
- [ ] Certificates on completion
- [ ] Advanced analytics dashboard
- [ ] Mobile app version
- [ ] Social sharing features

---

**Built with ❤️ using Next.js, Express.js, and MySQL**

Happy Learning! 🎓✨
