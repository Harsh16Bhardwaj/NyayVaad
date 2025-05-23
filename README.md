# 🏛️ NyaayVaad: Legal Document Intelligence Platform

## Overview

**NyaayVaad** is an AI-powered legal document intelligence platform designed to streamline legal research, case summarization, and law recommendation. By integrating advanced AI models (Gemini, ChatGPT), robust backend management, and scalable storage (Supabase), NyaayVaad automates the extraction, matching, and summarization of legal documents, making legal research faster, smarter, and more reliable.

---

## 🚀 Workflow

![Workflow Diagram](./public/Workflow.png) <!-- Update with actual path if needed -->

### Step-by-Step Process

1. **User Interaction**
   - Users interact with the platform via the frontend, submitting queries or documents.

2. **Backend State Management**
   - The backend manages user state and orchestrates the workflow, ensuring smooth data flow and process management.

3. **AI-Powered Document Matching**
   - **Gemini** performs AI-based description matching to identify relevant legal documents from the **Kanoon** database.
   - Document 1-liners are fetched and matched using advanced semantic search.

4. **Document Fetching & Parsing**
   - Once matched, documents are fetched from Kanoon.
   - Documents are parsed (HTML Parsing) and pre-processed for further analysis.

5. **Initial Reduction & Analysis**
   - Gemini performs an initial reduction, extracting key information and reducing document complexity.

6. **Legal Intelligence & Recommendations**
   - Gemini generates:
     - Case summaries
     - Relevant law recommendations
     - TODO lists
     - Handles further queries
   - Relevant laws are fetched using a combination of chat memory, URL parsing, and vector database lookups.

7. **Data Storage**
   - All processed data, summaries, and recommendations are stored in **Supabase** for scalability and easy retrieval.

8. **Final Summarization**
   - The final summary is generated using **ChatGPT**, providing a concise, user-friendly PDF report.

---

## 🛠️ Tech Stack

- **AI Models:** Gemini, ChatGPT
- **Backend:** Custom API/Server (State Management)
- **Legal Database:** Kanoon
- **Storage:** Supabase
- **Parsing:** HTML Parsing Engine
- **Frontend:** (To be specified)
- **Other:** Vector DB, URL Parser, Chat Memory

---

## 📦 Features

- **AI-Based Legal Document Matching**
- **Automated Case Summarization**
- **Relevant Law Extraction & Recommendations**
- **PDF Report Generation**
- **Scalable Data Storage**
- **Stateful User Experience**

---

## 🏗️ Architecture Highlights

- **Modular & Scalable:** Easily extendable for new data sources or AI models.
- **Seamless Integration:** Connects legal databases, AI, and storage for end-to-end automation.
- **User-Centric:** Designed for legal professionals, researchers, and students.

---

## 📄 Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-org/nyaayvaad.git
   cd nyaayvaad
   ```

2. **Install Dependencies**
   ```bash
   # Example for Node.js/React backend
   npm install
   ```

3. **Configure Environment**
   - Set up API keys for Gemini, ChatGPT, Supabase, and Kanoon.
   - Update `.env` with your credentials.

4. **Run the Application**
   ```bash
   npm start
   ```

5. **Access the Platform**
   - Open your browser and navigate to `http://localhost:3000`

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📢 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [Kanoon](https://www.kanoon.com/) for legal document access
- [OpenAI](https://openai.com/) for ChatGPT
- [Supabase](https://supabase.com/) for scalable storage

---

**NyaayVaad** — Empowering legal research with AI.

---

# NyaayVaad 🏛️

A Modern Legal Case Management System built with Next.js, TypeScript, and Supabase.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-2.0.0-green.svg)](https://supabase.com)

## Overview 🌟

NyaayVaad is a sophisticated legal case management platform designed to streamline legal workflows, enhance collaboration, and improve case tracking efficiency. Built with modern web technologies, it offers a robust, scalable, and user-friendly interface for legal professionals.

### Key Benefits
- ⚡ **High Performance**: Optimized for handling large case loads
- 🔒 **Enterprise Security**: Built with legal industry compliance in mind
- 📱 **Responsive Design**: Works seamlessly across all devices
- 🔄 **Real-time Updates**: Instant case status changes and notifications

## Features 🚀

### Core Functionalities
- 📝 **Case Management**
  - Comprehensive case tracking with custom fields
  - Document management with version control
  - Timeline visualization with milestones
  - Status monitoring with automated alerts
  - Case categorization and tagging

- 🤝 **Collaboration Tools**
  - Team-based case assignments with role permissions
  - Real-time updates and notifications
  - Comment threads with @mentions
  - Document sharing with access control
  - Calendar integration for deadlines

- 📊 **Analytics Dashboard**
  - Case progress tracking with KPIs
  - Performance metrics and reports
  - Custom report generation
  - Data visualization with charts
  - Export capabilities (PDF, CSV)

### Technical Features
- ⚡ **Performance Optimized**
  - Server-side rendering with Next.js
  - Code splitting and lazy loading
  - Memoized components for efficiency
  - Optimized database queries
  - Caching strategies

- 🔒 **Security**
  - Role-based access control (RBAC)
  - End-to-end encryption for sensitive data
  - Audit logging for all actions
  - Secure authentication with 2FA
  - GDPR and HIPAA compliance

## Tech Stack 🛠️

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.0
- **UI Library**: React 18
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS + Shadcn/ui
- **Animation**: Framer Motion
- **Forms**: React Hook Form
- **Validation**: Zod

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime
- **API**: REST + GraphQL
- **Search**: Full-text search with PostgreSQL

### Development Tools
- **Package Manager**: npm 9+
- **Linting**: ESLint + TypeScript
- **Formatting**: Prettier
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry
- **Documentation**: Storybook

## Getting Started 🏁

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Supabase account
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/nyaayvaad.git
cd nyaayvaad
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Configure Supabase
```bash
# Create a new project in Supabase
# Update .env.local with your credentials
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
```

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Example Code Snippets

```typescript
// Example of a memoized component
import { useCallback, memo } from 'react';

const TodoItem = memo(({ todo, onUpdate }) => {
  const handleUpdate = useCallback(() => {
    onUpdate(todo.id);
  }, [todo.id, onUpdate]);

  return (
    <div className="p-4 border rounded-lg">
      <h3>{todo.title}</h3>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
});
```

```typescript
// Example of a Supabase query
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const getCases = async () => {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};
```

## Project Structure 📁

```
nyaayvaad/
├── src/
│   ├── app/              # Next.js app router
│   │   ├── api/         # API routes
│   │   ├── (auth)/      # Authentication routes
│   │   └── dashboard/   # Dashboard routes
│   ├── components/      # Reusable components
│   │   ├── ui/         # UI components
│   │   ├── forms/      # Form components
│   │   └── layout/     # Layout components
│   ├── lib/            # Utility functions
│   │   ├── supabase/   # Supabase client
│   │   └── utils/      # Helper functions
│   ├── types/          # TypeScript types
│   └── generated/      # Generated types
├── public/             # Static assets
├── prisma/            # Database schema
└── supabase/          # Supabase configuration
```

## Architecture 🏗️

### Frontend Architecture
- **Component-Based**: Modular, reusable components with atomic design
- **State Management**: Redux Toolkit for global state
- **Routing**: Next.js App Router with dynamic routes
- **API Integration**: RESTful endpoints with Supabase
- **Error Handling**: Global error boundary
- **Performance**: Image optimization, code splitting

### Backend Architecture
- **Database**: PostgreSQL with Supabase
- **Authentication**: JWT-based auth with refresh tokens
- **Real-time Updates**: WebSocket connections
- **File Storage**: Secure cloud storage with CDN
- **Caching**: Redis for session management
- **Search**: Full-text search with PostgreSQL

## Performance Optimizations ⚡

### Code-Level Optimizations
- Memoized components with `useCallback` and `useMemo`
- Dynamic imports for code splitting
- Image optimization with Next.js
- Efficient state management
- Lazy loading of components
- Virtualized lists for large datasets

### Infrastructure Optimizations
- Edge caching with Vercel
- CDN integration for static assets
- Database indexing and query optimization
- Connection pooling
- Rate limiting
- Load balancing

## Contributing 🤝

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write unit tests for new features
- Update documentation as needed
- Follow the existing code style
- Use conventional commits

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

For support, email support@nyaayvaad.com or join our [Discord community](https://discord.gg/nyaayvaad).

### Community Resources
- [Documentation](https://docs.nyaayvaad.com)
- [API Reference](https://api.nyaayvaad.com)
- [Blog](https://blog.nyaayvaad.com)
- [GitHub Discussions](https://github.com/yourusername/nyaayvaad/discussions)

## Acknowledgments 🙏

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- All contributors who have helped shape this project
- Open source community for inspiration and tools

---

Built with ❤️ by the NyaayVaad Team
