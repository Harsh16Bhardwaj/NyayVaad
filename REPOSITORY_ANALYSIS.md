# NyayVaad Repository Analysis 🏛️

## Project Overview
**NyayVaad** is an AI-powered legal assistance platform that helps users understand complex legal cases. It combines AI analysis (Langflow), legal database lookups (Indian Kanoon), and case management in a user-friendly interface.

**Tech Stack:**
- **Frontend:** Next.js 15.3.1, React 19, TypeScript, Framer Motion, TailwindCSS
- **Backend:** Next.js API Routes, Node.js runtime
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** Clerk (Enterprise-grade authentication)
- **State Management:** Redux Toolkit
- **AI/ML Integration:** Langflow (32k token Gemini model)
- **External APIs:** Indian Kanoon, Svix webhooks

---

## Architecture Overview

```
Client (UI Layer)
    ↓
Redux Store (State Management)
    ↓
Next.js API Routes (Backend)
    ↓
Prisma ORM ↔ PostgreSQL (Database)
    ↓
External Services (Langflow, Indian Kanoon, Clerk)
```

---

## Database Schema (Prisma)

### Key Models:

1. **User**
   - Core user identity with Clerk integration
   - Legal knowledge level tracking (NONE, BASIC, INTERMEDIATE, LAWYER)
   - Case history and demographics

2. **Case**
   - Main entity for legal matters
   - Connected to todos, extracted documents, sessions
   - Tracks case status (OPEN, IN_PROGRESS, CLOSED)
   - Stores timeline, evidence, agreements, analysis

3. **Session**
   - Chat session management (1:1 with Case)
   - Stores conversation history as JSON

4. **Todo**
   - AI-generated action items for cases
   - Deadline tracking with TodoStatus enum
   - Linked to specific cases

5. **ExtractedDoc**
   - Document management pipeline
   - Raw content + AI summaries
   - Indexed for quick lookups

6. **LegalTerm**
   - Glossary of legal terms
   - Categorized with usage examples
   - Global reference database

---

## Component Architecture

### Core Components (`src/components/`)

| Component | Purpose | Type |
|-----------|---------|------|
| **ReduxProvider** | Redux store wrapper | Provider |
| **ProtectedPage** | Auth guard with modal fallback | HOC |
| **CasesSection** | Case list display & filtering | Feature |
| **TodoItem** | Individual todo renderer | Feature |
| **CalendarView** | Deadline calendar visualization | Feature |
| **EditFieldModal** | In-place field editor | Modal |
| **AuthModal** | Clerk auth UI wrapper | Modal |
| **AuthButtons** | Sign in/up quick buttons | UI |
| **Header** | Navigation with particles animation | Layout |
| **Footer** | Site footer | Layout |
| **Pricing** | Pricing page component | Page |
| **HowWeWork** | Feature/workflow showcase | Page |

### UI Library Components (`src/components/ui/`)
- **button.tsx** - Styled button component
- **input.tsx** - Form input field
- **select.tsx** - Dropdown selector (Radix)
- **checkbox.tsx** - Checkbox control
- **slider.tsx** - Range slider
- **popover.tsx** - Floating panel
- **calendar.tsx** - Date picker
- **3d-pin.tsx** - 3D card effect
- **draggable-card.tsx** - Interactive card with drag
- **hero-parallax.tsx** - Parallax scrolling hero
- **svg-mask-effect.tsx** - Advanced SVG animations
- **following-pointer.tsx** - Mouse-tracking effects

---

## Redux Store (`src/app/store/`)

### State Slices:

```typescript
// Store Structure
{
  cases: {
    cases: Case[],
    currentCase: Case | null,
    loading: boolean,
    error: string | null
  },
  todos: {
    todos: Todo[],
    loading: boolean,
    error: string | null
  },
  caseSummary: {
    summary: CaseSummary | null,
    loading: boolean,
    error: string | null
  },
  chatSessions: {
    sessions: Session[],
    loading: boolean,
    error: string | null
  }
}
```

### Async Thunks:
- `fetchCases()` → GET /api/cases
- `fetchCaseById(caseId)` → GET /api/cases/[caseId]
- `fetchTodos()` → GET /api/todos
- `addTodo(todo)` → POST /api/todos
- `updateTodo(todo)` → PUT /api/todos
- `deleteTodo(id)` → DELETE /api/todos
- `fetchCaseSummary()` → GET /api/case-summary

---

## API Routes (`src/app/api/`)

### Case Management
- **GET /api/cases** - Fetch user's cases (paginated, sorted by date)
- **POST /api/cases** - Create new case
- **GET /api/cases/[caseId]** - Fetch specific case details
- **PUT /api/cases/[caseId]** - Update case
- **DELETE /api/cases/[caseId]** - Delete case

### Chat & AI Processing
- **POST /api/chat** - Real-time chat with Langflow (streaming response)
  - Input: `{ message, sessionId }`
  - Output: Streamed JSON with AI response + related laws
  
- **POST /api/chat/conclude** - Finalize case analysis
  - Input: Complete `caseData` object
  - Output: Generated case summary, todos, analysis
  - Process: Langflow → JSON parsing → Prisma storage

- **GET /api/chat/sessions** - List all case sessions

### Todo Management
- **GET /api/todos** - List todos (with filtering)
- **POST /api/todos** - Create new todo
- **PUT /api/todos/[todoId]** - Update todo status/details
- **DELETE /api/todos/[todoId]** - Delete todo

### Document Processing
- **POST /api/fetch-docs** - Extract & summarize documents
  - Flow:
    1. Langflow keyword extraction
    2. Indian Kanoon API search
    3. Document summarization
    4. Prisma storage

### User Onboarding
- **POST /api/onboarding** - Complete user profile
  - Input: Name, profession, legal knowledge, case details
  - Output: Updated user record + preferences

### Webhooks
- **POST /api/webhook/clerk** - Clerk auth events
  - Handles user creation, updates, deletions
  - Syncs with Prisma database

### Contact & Reminders
- **POST /api/contact** - Send contact requests
- **POST /api/reminders** - Set case reminders

---

## Page Routes (`src/app/`)

### Public Pages
- **/** - Landing page with features, pricing, testimonials
- **/contact** - Contact form
- **/fun** - Fun/interactive page
- **/sign-in** - Clerk auth page
- **/sign-up** - Clerk auth page

### Protected Pages (Auth Required)
- **/dashboard** - Main dashboard with cases & todos
- **/dashboard/case/[caseId]** - Case detail page
- **/chat** - Chat interface
- **/chat/[sessionId]** - Session-specific chat
- **/onboarding** - User profile setup
- **/summarize** - Document summarizer

---

## Data Flow Diagrams

### Case Creation Flow
```
User fills form
  ↓
POST /api/chat/conclude
  ↓
Langflow processes data
  ↓
Returns: { caseFinalAnalysis, todos }
  ↓
Create Case record
Create Todo records (10-day deadline)
Create ExtractedDoc records
Store Session
  ↓
Redux updates state
  ↓
UI navigates to dashboard
```

### Chat Message Flow
```
User sends message
  ↓
POST /api/chat { message, sessionId }
  ↓
Clerk auth check
Langflow.chat() streaming
  ↓
Parse response JSON (ai_next_response, laws_related)
  ↓
Stream to frontend via ReadableStream
  ↓
Frontend appends to Redux + UI
```

### Document Processing Flow
```
POST /api/fetch-docs { description, caseId }
  ↓
STEP 1: Langflow keyword extraction
  ↓
STEP 2: Indian Kanoon API search
  ↓
STEP 3: Extract sections & summarize
  ↓
STEP 4: Prisma upsert ExtractedDoc
  ↓
Returns: { documents[], message }
```

---

## Key Implementation Patterns

### 1. Protected API Routes
```typescript
// Pattern used across all API routes
const { userId } = getAuth(request);
if (!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});
// Route logic
```

### 2. Redux Async Operations
```typescript
// Cases slice example
export const fetchCases = createAsyncThunk('cases/fetchCases', async (_) => {
  const res = await fetch('/api/cases');
  return res.json();
});
```

### 3. Streaming API Responses
```typescript
// Chat endpoint uses ReadableStream for real-time updates
const stream = new ReadableStream({
  async start(controller) {
    // Send data via controller.enqueue(...)
    // Close with controller.close()
  }
});
```

### 4. Prisma Error Handling
```typescript
try {
  // Query database
} catch (error) {
  console.error('[Tag] Error:', error);
} finally {
  await prisma.$disconnect();
}
```

---

## External Service Integration

### Langflow API
- **Endpoint:** `https://api.langflow.astra.datastax.com/lf/{...}/api/v1/run/{...}`
- **Auth:** Bearer token (env:LANGFLOW_TOKEN)
- **Models Used:**
  - Chat processing (32k context)
  - Keyword extraction
  - Case analysis
- **Response Format:** `{ outputs: [{ outputs: [{ results: { message: { text: "..." } } }] }] }`

### Indian Kanoon API
- **Purpose:** Legal precedent lookup
- **Auth:** Token in header
- **Query:** `https://api.indiankanoon.org/search/?formInput={query}&pagenum=0`

### Clerk Authentication
- **Social Auth:** Google, GitHub, Facebook
- **Email/Password:** Built-in
- **Webhook:** `/api/webhook/clerk` syncs with Prisma

---

## State Management Flow

### Current Architecture
- **Redux Toolkit** for all client state
- **Async thunks** for API communication
- **Selectors** for component subscriptions
- **Reducers** for local state mutations

### Redux Slices:
1. **caseSlice** - Cases CRUD + current case
2. **todoSlice** - Todo management + filtering
3. **caseSummarySlice** - Case analysis data
4. **chatSessionsSlice** - Chat history management

---

## Deployment Configuration

### Environment Variables Required
```
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
CLERK_WEBHOOK_SECRET=...
LANGFLOW_API_URL=...
LANGFLOW_TOKEN=...
FETCHING_DOCS_LANGFLOW_TOKEN=...
FINAL_RESPONSE_LANGFLOW_TOKEN=...
KANOON_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Build Configuration
- **Next.js 15** with turbopack
- **TypeScript strict mode**
- **Dynamic routing** with catch-all segments
- **API streaming** enabled (maxDuration: 120s)

---

## Known Issues & TODO Items

1. **Prisma Schema Issues:**
   - `involvedLaws` field referenced but model missing
   - Session relation should be optional

2. **API Response Inconsistencies:**
   - `/api/chat/sessions` returns hardcoded mock data instead of DB query

3. **Error Handling:**
   - Some endpoints lack proper error logging
   - Client-side error boundaries needed

4. **Performance:**
   - Todo filtering done in memory (should be server-side)
   - No pagination on case list

5. **Testing:**
   - No unit tests present
   - No integration tests for API routes

---

## Development Workflow Recommendations

### For New Features:
1. Define Prisma model changes
2. Create migration: `prisma migrate dev --name feature_name`
3. Implement API route with proper auth
4. Add Redux async thunk + slice
5. Build UI component with Redux hooks
6. Add error handling & loading states

### For Bug Fixes:
1. Locate issue in component/API
2. Add console logs if debugging
3. Write minimal reproduction
4. Fix with proper error handling
5. Test against edge cases

### Code Organization:
- Keep components < 300 lines (split if larger)
- API routes should validate input
- Always check auth in protected routes
- Use TypeScript strict mode
- Follow Prisma best practices (.disconnect() cleanup)

---

## Component Examples Structure

### Typical Page Component
```tsx
'use client'; // Client component
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReduxType from '@/app/store';

export default function PageName() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.slice);

  useEffect(() => {
    dispatch(fetchDataThunk());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;
  
  return <div>/* UI */</div>;
}
```

### Typical API Route
```ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const data = await req.json();
    // Validate + process
    const result = await prisma.model.create({data});
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('[TAG] Error:', error);
    return NextResponse.json({error: "Internal error"}, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
}
```

---

## Summary of Main Locations

| What | Where |
|------|-------|
| Redux Store | `src/app/store/` |
| API Endpoints | `src/app/api/` |
| Page Components | `src/app/*/page.tsx` |
| Reusable Components | `src/components/` |
| UI Primitives | `src/components/ui/` |
| Database Schema | `prisma/schema.prisma` |
| Utility Functions | `src/lib/` |
| Type Definitions | `src/types/` |
| Styling | `src/app/globals.css` + Tailwind |
| Generated Types | `src/generated/prisma/` |

---

**Last Updated:** February 13, 2026  
**Analyzed By:** GitHub Copilot  
**Total Components:** 20+  
**Total API Routes:** 10+  
**Total Redux Slices:** 4  

