# NyayVaad Architecture & Data Flow Diagrams

## System Architecture Diagram

```mermaid
graph TB
    subgraph Client["🖥️ CLIENT LAYER (Next.js)"]
        UI["React Components<br/>(Pages + Features)"]
        REDUX["Redux Store<br/>(State Management)"]
        UI -->|dispatch| REDUX
        REDUX -->|subscribe| UI
    end

    subgraph API["⚙️ API LAYER (Next.js Routes)"]
        CASES["Cases API<br/>POST/GET/PUT/DELETE"]
        TODOS["Todos API<br/>POST/GET/PUT/DELETE"]
        CHAT["Chat API<br/>POST /api/chat"]
        CONCLUDE["Conclude API<br/>POST /api/chat/conclude"]
        DOCS["Docs API<br/>POST /api/fetch-docs"]
        AUTH["Auth API<br/>(Clerk Webhook)"]
        ONBOARD["Onboarding API<br/>POST /api/onboarding"]
    end

    subgraph Services["🔌 EXTERNAL SERVICES"]
        LANGFLOW["Langflow AI<br/>(Gemini 32k)"]
        KANOON["Indian Kanoon<br/>(Legal Lookup)"]
        CLERK["Clerk Auth<br/>(SSO)"]
    end

    subgraph DB["💾 DATABASE LAYER"]
        POSTGRES["PostgreSQL<br/>(Main DB)"]
        PRISMA["Prisma ORM<br/>(Query Builder)"]
    end

    subgraph STORAGE["📁 STORAGE"]
        SESSION["Session Data"]
        DOCS_STORE["Extracted Docs"]
        USERS_DATA["User Profiles"]
    end

    UI -->|fetch/POST| API
    REDUX -->|watch| API
    
    CASES -->|query| PRISMA
    TODOS -->|query| PRISMA
    CHAT -->|call| LANGFLOW
    CONCLUDE -->|call| LANGFLOW
    DOCS -->|call| LANGFLOW
    DOCS -->|call| KANOON
    AUTH -->|verify| CLERK
    ONBOARD -->|create| PRISMA
    
    PRISMA -->|SQL| POSTGRES
    POSTGRES -->|store| SESSION
    POSTGRES -->|store| DOCS_STORE
    POSTGRES -->|store| USERS_DATA

    classDef client fill:#6366f1,stroke:#4f46e5,color:#fff
    classDef api fill:#8b5cf6,stroke:#7c3aed,color:#fff
    classDef service fill:#ec4899,stroke:#be185d,color:#fff
    classDef database fill:#06b6d4,stroke:#0891b2,color:#fff
    classDef storage fill:#f59e0b,stroke:#d97706,color:#fff
    
    class Client client
    class API api
    class Services service
    class DB database
    class STORAGE storage
```

## Data Flow: Case Creation to Dashboard

```mermaid
sequenceDiagram
    actor User
    participant Frontend as Frontend<br/>(Chat Page)
    participant ChatAPI as /api/chat
    participant ConcludeAPI as /api/chat/conclude
    participant Langflow as Langflow AI
    participant Database as PostgreSQL
    participant Redux as Redux Store
    participant Dashboard as Dashboard Page

    User->>Frontend: Enter case info & click Conclude
    Frontend->>Redux: Set loading state
    
    Frontend->>ConcludeAPI: POST case data
    
    ConcludeAPI->>ConcludeAPI: Verify auth
    ConcludeAPI->>ConcludeAPI: Validate required fields
    
    ConcludeAPI->>Langflow: Send case for final analysis
    
    Langflow->>Langflow: Process with Gemini
    Langflow-->>ConcludeAPI: Return analysis + todos
    
    ConcludeAPI->>Database: Create Case record
    ConcludeAPI->>Database: Create Todo records (10-day deadline)
    ConcludeAPI->>Database: Create ExtractedDoc records
    ConcludeAPI->>Database: Create Session record
    
    Database-->>ConcludeAPI: Confirm creation
    ConcludeAPI-->>Frontend: Return case ID + summary
    
    Frontend->>Redux: Update with new case
    Frontend->>Dashboard: Navigate to /dashboard
    
    Dashboard->>Redux: Subscribe to cases
    Redux-->>Dashboard: Display new case
    User->>Dashboard: See case in list ✅
```

## Data Flow: Chat Message Processing

```mermaid
sequenceDiagram
    actor User
    participant Chat as Chat Interface
    participant ChatAPI as /api/chat
    participant Stream as ReadableStream
    participant Langflow as Langflow
    participant Redux as Redux Store

    User->>Chat: Type message + hit Send
    Chat->>Redux: Set isLoading = true
    
    Chat->>ChatAPI: POST { message, sessionId }
    
    ChatAPI->>ChatAPI: Verify auth
    ChatAPI->>Stream: Create ReadableStream
    
    ChatAPI->>Langflow: async call chat()
    
    Langflow->>Langflow: Process with Gemini
    Langflow-->>ChatAPI: Return AI response JSON
    
    ChatAPI->>Stream: enqueue(parsed response)
    ChatAPI->>Stream: controller.close()
    
    Stream-->>Chat: Stream response chunks
    
    Chat->>Chat: Parse JSON response
    Chat->>Redux: Append to messages
    Chat->>Redux: Set isLoading = false
    Chat->>Chat: Re-render with new message ✅
    
    Redux-->>Chat: Update UI
    User->>Chat: See AI response
```

## Data Flow: Document Processing

```mermaid
graph LR
    A["POST /api/fetch-docs<br/>{description, caseId}"] 
    |Auth check|
    B["Validate input"]
    
    B -->|Get case| C["Query Database"]
    C -->|Success| D["Step 1:<br/>Keyword Extraction"]
    C -->|Fail| Z["❌ Return 404"]
    
    D -->|Call Langflow| E["Langflow extracts<br/>query_keywords"]
    E -->|Parse JSON| F["Extract keyword"]
    
    F -->|Search| G["Step 2:<br/>Indian Kanoon API"]
    G -->|Get results| H["Extract ACT/Section"]
    
    H -->|Fetch full text| I["Step 3:<br/>Summarize"]
    I -->|Call Langflow| J["Langflow creates<br/>aiSummary"]
    
    J -->|Parse| K["Step 4:<br/>Save to DB"]
    K -->|Upsert| L["Prisma ExtractedDoc"]
    
    L -->|Success| M["Return documents[]<br/>✅ 200 OK"]
    E -->|Parse error| N["❌ Return 400"]
    G -->|No results| O["❌ Return 400"]
    J -->|Parse error| P["❌ Return 400"]
    
    style A fill:#6366f1,stroke:#4f46e5,color:#fff
    style D fill:#8b5cf6,stroke:#7c3aed
    style G fill:#8b5cf6,stroke:#7c3aed
    style I fill:#8b5cf6,stroke:#7c3aed
    style M fill:#10b981
    style Z fill:#ef4444
    style N fill:#ef4444
    style O fill:#ef4444
    style P fill:#ef4444
```

## Redux State Tree

```mermaid
graph TD
    STORE["Store"]
    
    STORE -->|cases| CASE_STATE["CaseState<br/>cases: Case[]<br/>currentCase: Case | null<br/>loading: boolean<br/>error: string | null"]
    
    STORE -->|todos| TODO_STATE["TodoState<br/>todos: Todo[]<br/>loading: boolean<br/>error: string | null"]
    
    STORE -->|caseSummary| SUMMARY_STATE["CaseSummaryState<br/>summary: CaseSummary | null<br/>loading: boolean<br/>error: string | null"]
    
    STORE -->|chatSessions| CHAT_STATE["ChatSessionState<br/>sessions: Session[]<br/>loading: boolean<br/>error: string | null"]
    
    CASE_STATE -->|fetchCases| F1["async: GET /api/cases"]
    CASE_STATE -->|fetchCaseById| F2["async: GET /api/cases/:id"]
    
    TODO_STATE -->|fetchTodos| F3["async: GET /api/todos"]
    TODO_STATE -->|addTodo| F4["async: POST /api/todos"]
    TODO_STATE -->|updateTodo| F5["async: PUT /api/todos/:id"]
    TODO_STATE -->|deleteTodo| F6["async: DELETE /api/todos/:id"]
    
    SUMMARY_STATE -->|fetchCaseSummary| F7["async: GET /api/case-summary"]
    
    CHAT_STATE -->|fetchSessions| F8["async: GET /api/chat/sessions"]
    
    style STORE fill:#6366f1,stroke:#4f46e5,color:#fff
    style CASE_STATE fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style TODO_STATE fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style SUMMARY_STATE fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style CHAT_STATE fill:#8b5cf6,stroke:#7c3aed,color:#fff
```

## Component Hierarchy

```mermaid
graph TD
    APP["&lt;RootLayout&gt;<br/>Clerk + Redux Provider"]
    
    APP -->|/" | HOME["Home Page<br/>Landing Features Pricing"]
    APP -->|/dashboard| DASH["DashboardPage<br/>Main Hub"]
    APP -->|/chat| CHAT["ChatPage<br/>Case Creation"]
    APP -->|/onboarding| ONBOARD["OnboardingPage<br/>User Setup"]
    
    DASH -->|Protected| PROTECTED["ProtectedPage<br/>Auth Guard"]
    PROTECTED -->|render| DASH_CONTENT["Dashboard Content"]
    
    DASH_CONTENT -->|components| CASES_SEC["CasesSection<br/>List + Filter"]
    DASH_CONTENT -->|components| TODO_LIST["Todo List<br/>Multiple TodoItem"]
    DASH_CONTENT -->|components| CAL["CalendarView<br/>Deadline Tracker"]
    
    CASES_SEC -->|display| CASE_CARD["Case Card<br/>Title+Status+Date"]
    TODO_LIST -->|render| TODOITEM["TodoItem<br/>Single Todo UI"]
    
    CHAT -->|components| MSG_LIST["Message List"]
    CHAT -->|components| INPUT["Chat Input"]
    CHAT -->|components| TODO_GEN["Auto Todo Generator"]
    
    ONBOARD -->|form| STEP1["Step 1: Language"]
    ONBOARD -->|form| STEP2["Step 2: Profile"]
    ONBOARD -->|form| STEP3["Step 3: Case Type"]
    
    HOME -->|layout| HEADER["Header<br/>Navigation"]
    HOME -->|layout| FOOTER["Footer<br/>Links"]
    HOME -->|features| PARALLAX["ParallaxFeatures"]
    HOME -->|features| PRICING["Pricing Component"]
    HOME -->|features| PIN["3D Pin Cards"]
    
    style APP fill:#6366f1,stroke:#4f46e5,color:#fff
    style PROTECTED fill:#ec4899,stroke:#be185d,color:#fff
    style CASES_SEC fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style TODO_LIST fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style CAL fill:#8b5cf6,stroke:#7c3aed,color:#fff
```

## Database Entity Relationships

```mermaid
erDiagram
    USER ||--o{ CASE : creates
    USER ||--o{ SESSION : owns
    
    CASE ||--o{ TODO : generates
    CASE ||--o{ EXTRACTED_DOC : contains
    CASE ||--|| SESSION : has
    CASE ||--o{ INVOLVED_LAW : references
    
    SESSION ||--o{ MESSAGE : stores
    
    EXTRACTED_DOC ||--o{ LEGAL_TERM : mentions
    
    USER {
        string id PK
        string clerkId UK
        string email UK
        string name
        string profession
        enum legalKnowledge "NONE\|BASIC\|INTERMEDIATE\|LAWYER"
        int jailTimeYears
        string warningSeverity
        string pendingCaseType
        datetime createdAt
        datetime updatedAt
    }
    
    CASE {
        string id PK
        string userId FK
        string title
        string description
        enum status "OPEN\|IN_PROGRESS\|CLOSED"
        string opponent
        string[] timeline
        boolean evidence
        boolean agreement
        string finalAnalysis
        datetime createdAt
        datetime updatedAt
    }
    
    SESSION {
        string sessionId PK
        string caseId FK "UNIQUE"
        json messages
        datetime createdAt
        datetime updatedAt
    }
    
    TODO {
        string id PK
        string caseId FK
        string title
        string description
        datetime dueAt
        enum status "PENDING\|COMPLETED\|IGNORED"
        datetime createdAt
    }
    
    EXTRACTED_DOC {
        string id PK
        string docId UK
        string caseId FK
        string title
        string rawContent
        string aiSummary
        datetime createdAt
    }
    
    LEGAL_TERM {
        string id PK
        string word UK
        string description
        string[] usage
        string category
        string source
        datetime createdAt
    }
    
    INVOLVED_LAW {
        string id PK
        string caseId FK
        string law
        string description
    }
    
    MESSAGE {
        string id PK
        string sessionId FK
        string sender "user\|ai"
        string content
        datetime timestamp
    }
```

## API Route Tree

```
/api/
├── cases/
│   ├── route.ts              [GET] List user's cases
│   │                         [POST] Create case (WIP)
│   └── [caseId]/
│       ├── route.ts          [GET] Case detail (WIP)
│       │                     [PUT] Update case (WIP)
│       │                     [DELETE] Delete case (WIP)
│       └── (case-specific routes)
│
├── todos/
│   ├── route.ts              [GET] List todos
│   │                         [POST] Create todo
│   └── [todoId]/
│       ├── route.ts          [PUT] Update todo (WIP)
│       │                     [DELETE] Delete todo (WIP)
│
├── chat/
│   ├── route.ts              [POST] Chat message (Langflow)
│   ├── conclude/
│   │   └── route.ts          [POST] Finalize case
│   └── sessions/
│       └── route.ts          [GET] List sessions (BROKEN)
│
├── fetch-docs/
│   └── route.ts              [POST] Extract docs (Langflow + Kanoon)
│
├── onboarding/
│   └── route.ts              [POST] Complete profile
│
├── reminders/
│   └── route.ts              [POST] Set reminder
│
├── contact/
│   └── route.ts              [POST] Contact form
│
└── webhook/
    └── clerk/
        └── route.ts          [POST] Auth sync
```

## Component Integration Example

```mermaid
graph LR
    A["DashboardPage<br/>Main Container"]
    |"useDispatch"|
    B["Redux Dispatcher"]
    |"dispatch(fetchCases)"|
    C["fetchCases<br/>AsyncThunk"]
    |"fetch /api/cases"|
    D["GET /api/cases<br/>API Route"]
    |"query Prisma"|
    E["PostgreSQL<br/>Query"]
    
    E -->|"return Cases[]"| D
    D -->|"JSON response"| C
    C -->|"payload"| B
    B -->|"cases.fulfilled"| F["caseSlice<br/>Reducer"]
    F -->|"state update"| G["Redux Store"]
    G -->|"useSelector"| H["CasesSection<br/>Component"]
    H -->|"render"| I["Case Cards<br/>UI"]
    
    style A fill:#6366f1,color:#fff
    style I fill:#10b981,color:#fff
```

## Authentication & Authorization Flow

```mermaid
sequenceDiagram
    participant User
    participant Clerk as Clerk UI
    participant Webhook as Webhook Endpoint
    participant DB as Prisma DB
    participant Page as Protected Page
    participant API as API Route

    User->>Clerk: Sign up/Sign in
    Clerk->>Clerk: Verify credentials
    Clerk-->>User: Set session
    
    Clerk->>Webhook: POST /api/webhook/clerk
    Note over Webhook: Verify Svix signature
    
    Webhook->>DB: Check if user exists
    alt User exists
        Webhook->>DB: Update user record
    else User is new
        Webhook->>DB: Create new user
    end
    
    DB-->>Webhook: Confirm
    
    User->>Page: Navigate to /dashboard
    Page->>Page: Call useUser() hook
    Page->>Page: Check isSignedIn
    
    alt Not signed in
        Page->>Page: Show AuthModal
    else Signed in
        Page->>API: Fetch /api/cases
        API->>API: getAuth(request) → userId
        API->>API: Verify userId matches DB
        API->>DB: Query cases WHERE userId = ...
        DB-->>API: Return results
        API-->>Page: JSON response
        Page->>Page: Redux update
        Page->>User: Render dashboard ✅
    end
```

---

## File Structure Tree

```
📦 nyaayvaad/
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 next.config.ts
├── 🔒 prisma/
│   ├── schema.prisma
│   └── migrations/
│       ├── migration_lock.toml
│       └── <timestamp>_migration/
│           └── migration.sql
├── 📁 src/
│   ├── 📄 middleware.ts (Clerk)
│   ├── 🎨 app/
│   │   ├── page.tsx (Landing)
│   │   ├── layout.tsx (Root)
│   │   ├── globals.css
│   │   ├── 📁 api/
│   │   │   ├── cases/
│   │   │   ├── todos/
│   │   │   ├── chat/
│   │   │   ├── fetch-docs/
│   │   │   ├── onboarding/
│   │   │   ├── webhook/
│   │   │   └── contact/
│   │   ├── 📁 dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── case/[caseId]/
│   │   ├── 📁 chat/
│   │   │   ├── page.tsx
│   │   │   └── [sessionId]/page.tsx
│   │   ├── 📁 onboarding/
│   │   ├── 📁 store/
│   │   │   ├── index.ts
│   │   │   └── slices/
│   │   │       ├── caseSlice.ts
│   │   │       ├── todoSlice.ts
│   │   │       ├── caseSummarySlice.ts
│   │   │       └── chatSessionsSlice.ts
│   │   └── other pages...
│   ├── 🎨 components/
│   │   ├── ui/ (Radix library)
│   │   ├── ReduxProvider.tsx
│   │   ├── ProtectedPage.tsx
│   │   ├── CasesSection.tsx
│   │   ├── TodoItem.tsx
│   │   ├── CalendarView.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── other components...
│   ├── 📚 lib/
│   │   ├── prisma.ts
│   │   ├── supabase.ts
│   │   ├── langflow.ts
│   │   └── utils.ts
│   ├── 📋 types/
│   │   └── case.ts
│   └── 🤖 generated/
│       └── prisma/
│           └── (auto-generated types)
├── 📁 public/
│   ├── favicon.ico
│   └── images/
└── 📝 documentation/
    ├── REPOSITORY_ANALYSIS.md
    └── IMPLEMENTATION_CHECKLIST.md
```

---

**Legend:**
- 🟢 Ready/Implemented
- 🟡 Partially done  
- 🔴 Missing/Broken
- 📦 External dependencies
- 🔒 Protected/Auth required

