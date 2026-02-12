# Implementation Checklist & Priority Tasks 🎯

## Current Status Assessment

### ✅ Completed:
- Next.js project structure with TypeScript
- Clerk authentication integration
- Prisma ORM setup with PostgreSQL
- Redux state management store
- Basic API routes scaffolding
- UI component library (Radix-based)
- Landing page with features showcase
- Data models for User, Case, Todo, Session

### ⚠️ Partially Complete:
- API endpoints (routes exist but some lack proper error handling)
- Case management flow (can create but some updates missing)
- Chat integration (basic structure, needs testing)
- Document processing (three-step flow implemented but incomplete)
- Dashboard (layout done, filtering needs work)

### ❌ Missing/Broken:
- Prisma schema inconsistencies (`involvedLaws` field referenced but model missing)
- API response validation and detailed error messages
- Unit & integration tests
- Session ID error in chat sessions API (returns mock data)
- Proper pagination on case lists
- Document extraction confirmation UI
- Case detail page fullservice implementation

---

## Priority 1: Fix Critical Issues (Do First!)

### 1.1 Fix Prisma Schema Issues
**File:** `prisma/schema.prisma`

**Issues:**
- `Case.involvedLaws` field references non-existent model
- Missing `EnhancedLaw` model that's referenced in migrations

**Tasks:**
1. [ ] Add missing `EnhancedLaw` model to schema
2. [ ] Update migration to reflect schema changes
3. [ ] Run `prisma migrate dev --name fix_schema`
4. [ ] Update types in `src/types/case.ts`

### 1.2 Fix Chat Sessions API
**File:** `src/app/api/chat/sessions/route.ts`

**Issue:** Returns hardcoded mock data instead of querying database

**Tasks:**
1. [ ] Replace mock data with actual Prisma query
2. [ ] Properly map sessionId from database
3. [ ] Add error handling

### 1.3 Fix Types and Imports
**Files to Check:**
- `src/types/case.ts` - Ensure Case type matches schema
- `src/app/api/todos/route.ts` - Remove mock case creation
- `src/app/api/chat/route.ts` - Fix PrismaClient import location

**Tasks:**
1. [ ] Verify all types reflect current schema
2. [ ] Remove all mock/test data from production routes
3. [ ] Add proper error logging

---

## Priority 2: Complete Core Functionality

### 2.1 Complete Case Management API
**Routes to Implement:**

1. **POST /api/cases** - Create case (currently missing)
   ```
   Input: { title, description, opponent, status }
   Output: Created case object
   Auth: Required
   ```

2. **PUT /api/cases/[caseId]** - Update case
   ```
   Input: Partial case data
   Output: Updated case
   Auth: Required, verify ownership
   ```

3. **DELETE /api/cases/[caseId]** - Delete case
   ```
   Output: Success message
   Auth: Required, verify ownership
   ```

4. **GET /api/cases/[caseId]** - Get case details
   ```
   Output: Full case with todos, docs, session
   Auth: Required, verify ownership
   ```

### 2.2 Complete Todo Management
**Tasks:**
1. [ ] Verify `/api/todos` GET filters by case
2. [ ] Implement `/api/todos/[todoId]` PUT (update status, deadline)
3. [ ] Implement `/api/todos/[todoId]` DELETE
4. [ ] Add validation for required fields
5. [ ] Add owner verification checks

### 2.3 Implement Document Upload/Processing
**Missing Pieces:**
1. [ ] Frontend component for document upload
2. [ ] `/api/fetch-docs` error response handling
3. [ ] Status tracking during processing
4. [ ] Success/failure notifications

---

## Priority 3: Build UI/UX Components

### 3.1 Dashboard Page Enhancements
**File:** `src/app/dashboard/page.tsx`

**Issues:**
- Case list uses mock data in some places
- Todo filtering is in-memory (should be server-side)
- No loading states for individual sections
- Case summary section incomplete

**Tasks:**
1. [ ] Implement proper server-side case filtering
2. [ ] Add Redux actions for dashboard refresh
3. [ ] Add loading skeletons for each section
4. [ ] Implement case detail side panel

### 3.2 Case Detail Page
**File:** `src/app/dashboard/case/[caseId]/page.tsx` (MISSING!)

**Tasks:**
1. [ ] Create page.tsx component
2. [ ] Fetch case details from API
3. [ ] Display case timeline
4. [ ] Show all related documents
5. [ ] Display all todos for case
6. [ ] Add action buttons (edit, delete, download report)

### 3.3 Chat Page Enhancement
**File:** `src/app/chat/page.tsx` + `[sessionId]/page.tsx`

**Tasks:**
1. [ ] Implement session selection UI
2. [ ] Real-time message streaming display
3. [ ] Message history persistence
4. [ ] Case creation from chat completion

### 3.4 New Case Creation Flow
**Components:**
- Create multi-step form
- Add error boundary
- Implement progress tracking
- Add success confirmation

---

## Priority 4: State Management & Redux

### 4.1 Fix Redux Slices
**Tasks:**
1. [ ] Verify all async thunks match API endpoints
2. [ ] Add error messages to all slices
3. [ ] Implement proper loading states
4. [ ] Add caching/expiration logic

### 4.2 Add Missing Thunks
- [ ] Update case status
- [ ] Delete case
- [ ] Create case
- [ ] Fetch case details
- [ ] Update todo priority
- [ ] Process documents

### 4.3 Add TypeScript Interfaces
```typescript
// Ensure these exist in src/types/
- User interface
- Case interface (complete)
- Todo interface (complete)
- Session interface
- ExtractedDoc interface
- ChatMessage interface
- ReduxState interface
```

---

## Priority 5: Error Handling & Validation

### 5.1 API Route Validation
**Template for each route:**
```typescript
// Check auth
const { userId } = getAuth(request);
if (!userId) return Unauthorized;

// Validate input
const data = await request.json();
if (!data.required_field) return BadRequest;

// Check ownership
const resource = await prisma.model.findUnique(...);
if (resource.userId !== userId) return Forbidden;

// Process with error handling
try { /* logic */ } 
catch (error) { console.error('Log'); return Error; }
finally { await prisma.$disconnect(); }
```

### 5.2 Component Error Boundaries
**Tasks:**
1. [ ] Add error boundaries to pages
2. [ ] Add error states to all data-fetching components
3. [ ] Implement proper error notifications
4. [ ] Add retry mechanisms

### 5.3 Input Validation
**Libraries to use:** Zod or io-ts
**Tasks:**
1. [ ] Create validation schemas for all API inputs
2. [ ] Add frontend form validation
3. [ ] Add server-side validation in API routes

---

## Priority 6: Testing Setup

### 6.1 Unit Tests
**Setup Steps:**
1. [ ] Install Jest + React Testing Library
2. [ ] Configure tsconfig for tests
3. [ ] Add test utilities

**Tests to Create:**
- [ ] Redux slices (actions, selectors, reducers)
- [ ] API route handlers
- [ ] Utility functions
- [ ] Component rendering

### 6.2 Integration Tests
**Focus Areas:**
- [ ] Case creation → todo generation → display
- [ ] Auth flow → user creation → dashboard access
- [ ] Chat message → langflow processing → display

### 6.3 E2E Tests (Optional)
**Tool:** Playwright or Cypress
- [ ] Complete user journey
- [ ] Error scenarios
- [ ] Performance benchmarks

---

## Priority 7: Performance & Optimization

### 7.1 Database Optimizations
**Tasks:**
1. [ ] Add database indexes (see schema)
2. [ ] Implement query pagination
3. [ ] Add caching for frequently accessed data

### 7.2 Frontend Optimizations
**Tasks:**
1. [ ] Implement code splitting for pages
2. [ ] Add image optimization
3. [ ] Implement virtual scrolling for long lists
4. [ ] Add Redux selector memoization

### 7.3 API Optimizations
**Tasks:**
1. [ ] Add response caching headers
2. [ ] Implement request compression
3. [ ] Add query parameter validation
4. [ ] Optimize Prisma queries (include relations)

---

## Priority 8: Features & Polish

### 8.1 Export/Download Features
- [ ] Generate PDF reports
- [ ] Export case as JSON
- [ ] Export todos as CSV
- [ ] Email case summary

### 8.2 Search & Filter
- [ ] Full-text case search
- [ ] Filter by date range
- [ ] Filter by status
- [ ] Search within documents

### 8.3 Notifications
- [ ] Email notifications for deadlines
- [ ] In-app toast notifications
- [ ] Push notifications (optional)
- [ ] Email reminders

### 8.4 Additional Features
- [ ] Case sharing (share with lawyer)
- [ ] Comments on todos/cases
- [ ] Activity timeline
- [ ] User profile page

---

## File-by-File Implementation Plan

### Phase 1: Database & Types (1-2 days)
```
prisma/schema.prisma → Fix schema + migrations
src/types/case.ts → Complete type definitions
src/generated/prisma/ → Regenerate after schema fix
```

### Phase 2: API Routes (2-3 days)
```
src/app/api/cases/
  - route.ts → POST, GET, PUT, DELETE
  - [caseId]/page.tsx → GET single case
src/app/api/todos/
  - [todoId]/route.ts → PUT, DELETE
src/app/api/fetch-docs/
  - Fix existing route
src/app/api/chat/
  - sessions/route.ts → Fix to use real data
```

### Phase 3: Redux State (1-2 days)
```
src/app/store/slices/
  - caseSlice.ts → Add all actions
  - todoSlice.ts → Add all actions
  - New: documentSlice.ts
  - New: uiSlice.ts (loading states)
```

### Phase 4: UI Components (2-3 days)
```
src/app/dashboard/
  - page.tsx → Enhance
  - case/[caseId]/page.tsx → Create (NEW)
  - case/[caseId]/layout.tsx → Create (NEW)
src/app/chat/
  - page.tsx → Enhance
  - [sessionId]/page.tsx → Enhance
src/components/
  - New: CaseDetail.tsx
  - New: DocumentUpload.tsx
  - New: CaseForm.tsx
  - New: ErrorBoundary.tsx
```

### Phase 5: Error Handling & Tests (2-3 days)
```
src/app/api/ → Add validation
src/components/ → Add error boundaries
tests/ → Add unit tests
```

---

## Success Criteria

A feature is truly "complete" when:
1. ✅ API endpoint implemented with proper auth
2. ✅ Redux action & reducer created
3. ✅ React component built with loading/error states
4. ✅ TypeScript types defined
5. ✅ Error handling implemented
6. ✅ Input validation added
7. ✅ Tested manually
8. ✅ Responsive design verified

---

## Development Commands

```bash
# After schema changes
npm run prisma:deploy  # or: npx prisma migrate dev --name <name>

# Generate types
npx prisma generate

# View database UI
npx prisma studio

# Check for issues
npm run lint

# Build for production
npm run build

# Development server
npm run dev
```

---

## Next Steps to Start

1. **RIGHT NOW:** Review this checklist with the team
2. **Create branches** for Priority 1 fixes
3. **Run migrations** to sync schema
4. **Generate new types** from schema
5. **Test existing endpoints** for errors
6. **Fix API responses** to match expectations
7. **Update Redux** to handle all new data

---

**Estimated Timeline:** 2-3 weeks for full completion  
**Current Completeness:** ~50%  
**Critical Blockers:** 3 (schema, sessions API, case detail page)

