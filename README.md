# InterviewAce 🎯

An AI-powered interview practice web application that helps job seekers and professionals improve their interview skills through intelligent feedback and progress tracking.

## 🌟 Features

### Core Functionality
- **Audio & Video Recording**: Practice interviews with high-quality audio and video recording capabilities
- **Real-time Transcription**: Automatic speech-to-text conversion during practice sessions
- **AI-Powered Analysis**: Comprehensive evaluation of interview responses using advanced NLP
- **Multi-dimensional Scoring**: Detailed feedback on content, fluency, confidence, and clarity
- **Progress Tracking**: Visual analytics and performance trends over time

### Authentication & User Management
- **Secure Authentication**: Email-based signup and login with Supabase Auth
- **User Profiles**: Personalized dashboards with session history and statistics
- **Email Verification**: Secure account activation process

### Question Management
- **Curated Question Library**: 100+ professional interview questions across multiple categories
- **Question Categories**: 
  - Behavioral questions (STAR method)
  - Technical questions (role-specific) 
  - Situational questions (problem-solving)
  - Company-specific questions
- **Difficulty Levels**: Beginner, Intermediate, and Advanced questions
- **Smart Search & Filtering**: Find questions by category, difficulty, or keywords
- **Practice Sets**: Pre-configured question collections for focused practice

### AI Analysis & Feedback
- **Content Analysis**: Evaluation of answer relevance, structure, and completeness
- **Fluency Assessment**: Detection of filler words, pace analysis, and speech patterns
- **Confidence Scoring**: Voice tone and delivery confidence metrics
- **Clarity Evaluation**: Speech clarity and articulation assessment
- **Actionable Feedback**: Specific suggestions for improvement with examples
- **Improved Answer Examples**: AI-generated better responses for learning

### Analytics & Progress
- **Performance Dashboard**: Visual representation of improvement over time
- **Skill Breakdown**: Category-specific performance tracking
- **Session History**: Complete record of all practice sessions
- **Trend Analysis**: Weekly and monthly progress visualization
- **Goal Setting**: Personal improvement targets and milestones

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom design system
- **Shadcn/ui**: High-quality UI components
- **Recharts**: Data visualization and analytics charts

### Backend & Database
- **Supabase**: Backend-as-a-Service with PostgreSQL
- **Row Level Security (RLS)**: Secure data access policies
- **Real-time Subscriptions**: Live data updates
- **Supabase Auth**: Authentication and user management

### AI & Audio Processing
- **Web Speech API**: Browser-native speech recognition
- **MediaRecorder API**: Audio and video recording
- **AI SDK**: Integration with language models for content analysis
- **Custom Audio Analysis**: Prosody and speech pattern evaluation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/interviewace.git
   cd interviewace
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up Supabase**
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Run the database migration script

4. **Configure environment variables**
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
   \`\`\`

5. **Run database migrations**
   \`\`\`bash
   # Execute the SQL script in your Supabase SQL editor
   # File: scripts/001_create_tables.sql
   \`\`\`

6. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 📊 Database Schema

### Tables

#### `profiles`
- User profile information and preferences
- Links to Supabase Auth users
- Stores user statistics and settings

#### `interview_sessions`
- Records of all practice sessions
- Audio/video file references
- Session metadata and timestamps

#### `session_feedback`
- AI analysis results and scores
- Detailed feedback and suggestions
- Performance metrics and breakdowns

#### `questions`
- Interview question library
- Categories, difficulty levels, and metadata
- Usage statistics and ratings

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Secure API endpoints with authentication

## 🎯 Usage Guide

### Getting Started
1. **Sign Up**: Create an account with email verification
2. **Complete Profile**: Set up your profile and preferences
3. **Explore Questions**: Browse the question library by category
4. **Start Practicing**: Begin your first interview session

### Practice Session Workflow
1. **Select Questions**: Choose from library or practice sets
2. **Set Up Recording**: Configure audio/video preferences
3. **Record Response**: Answer questions with real-time transcription
4. **Get Analysis**: Receive AI-powered feedback and scores
5. **Review & Improve**: Study suggestions and practice again

### Tracking Progress
- View performance trends in the Progress section
- Monitor improvement across different skill areas
- Set goals and track achievement milestones
- Review session history and feedback

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Sessions
- `POST /api/sessions` - Create new practice session
- `GET /api/sessions` - Get user's session history
- `GET /api/sessions/[id]` - Get specific session details

### Analysis
- `POST /api/transcribe` - Audio transcription
- `POST /api/analyze` - AI feedback analysis
- `GET /api/feedback/[sessionId]` - Get session feedback

### Questions
- `GET /api/questions` - Get question library
- `GET /api/questions/categories` - Get question categories
- `POST /api/questions/search` - Search questions

## 🎨 Design System

### Colors
- **Primary**: Emerald green (#10b981) - Professional and encouraging
- **Secondary**: Slate grays for neutral elements
- **Accent**: Blue for interactive elements
- **Success/Error**: Standard semantic colors

### Typography
- **Headings**: Inter font family, various weights
- **Body**: Inter for readability and professionalism
- **Code**: JetBrains Mono for technical content

### Components
- Consistent spacing using Tailwind's scale
- Accessible color contrasts (WCAG AA compliant)
- Responsive design for all screen sizes
- Smooth animations and transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use the existing component patterns
- Maintain accessibility standards
- Write meaningful commit messages
- Test your changes thoroughly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the excellent backend infrastructure
- **Vercel** for seamless deployment and hosting
- **OpenAI** for AI analysis capabilities
- **Shadcn/ui** for beautiful, accessible components



---

**InterviewAce** - Ace your next interview with AI-powered practice! 🚀
