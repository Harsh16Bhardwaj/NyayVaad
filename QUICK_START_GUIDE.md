# Quick Start Implementation Guide 🚀

## For Getting Started Immediately

This guide walks you through implementing the most critical items first. Follow these steps in order.

---

## ✅ Step 1: Fix Database Schema (30 mins)

### The Problem
The Prisma schema references `involvedLaws` but the model is missing. This breaks case creation.

### The Solution

**File:** `prisma/schema.prisma`

**Action:** Add this model after the `Case` model:

```prisma
model EnhancedLaw {
  id            String   @id @default(cuid())
  law           String
  description   String
  caseId        String
  // Add back reference if needed
  createdAt     DateTime @default(now())

  @@index([caseId])
}
```

**Also update the Case model:**

```prisma
model Case {
  id            String         @id @default(cuid())
  user          User           @relation(fields: [userId], references: [id])
  userId        String
  title         String
  description   String
  status        CaseStatus     @default(OPEN)
  opponent      String?
  timeline      String[]       @db.Text
  evidence      Boolean
  agreement     Boolean
  todos         Todo[]
  extractedDocs ExtractedDoc[]
  laws          EnhancedLaw[]  // ADD THIS LINE
  finalAnalysis String?
  session       Session?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  @@index([userId])
}
```

### Apply Migration

```bash
npx prisma migrate dev --name add_enhanced_law_model
```

---

## ✅ Step 2: Fix Types (15 mins)

**File:** `src/types/case.ts`

**Update to match schema:**

```typescript
import { CaseStatus } from '@/generated/prisma';

export interface CaseData {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: CaseStatus;
  opponent?: string | null;
  timeline: string[];
  evidence: boolean;
  agreement: boolean;
  finalAnalysis?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseWithRelations extends CaseData {
  todos: Todo[];
  extractedDocs: ExtractedDoc[];
  laws: EnhancedLaw[];
  session?: Session | null;
}

export interface EnhancedLaw {
  id: string;
  law: string;
  description: string;
  caseId: string;
  createdAt: Date;
}

export interface ExtractedDoc {
  id: string;
  docId: string;
  title: string;
  caseId: string;
  rawContent: string;
  aiSummary: string;
  createdAt: Date;
}

export interface Session {
  sessionId: string;
  caseId: string;
  messages: any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Todo {
  id: string;
  title: string;
  description?: string | null;
  dueAt?: Date | null;
  status: 'PENDING' | 'COMPLETED' | 'IGNORED';
  caseId: string;
  createdAt: Date;
}
```

---

## ✅ Step 3: Fix Chat Sessions API (20 mins)

**File:** `src/app/api/chat/sessions/route.ts`

**BEFORE (Current - BROKEN):**
```typescript
const Cases = [
  {
    title: "Land Dispute with Neighbor",
    description: "Discussed property boundaries and legal recourse.",
    sessionId: "session_12345",
  },
  // ... mock data
];
return NextResponse.json(Cases);
```

**AFTER (Fixed - CORRECT):**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cases = await prisma.case.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        session: {
          select: { sessionId: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Map to response format
    const sessions = cases.map(c => ({
      caseId: c.id,
      title: c.title,
      description: c.description,
      status: c.status,
      sessionId: c.session?.sessionId || null,
    }));

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('[Chat Sessions] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}
```

---

## ✅ Step 4: Create Missing Case Detail Page (45 mins)

**File:** `src/app/dashboard/case/[caseId]/page.tsx` (CREATE NEW)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2, ArrowLeft, Calendar, Users, FileText, CheckCircle2, Download } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProtectedPage from '@/components/ProtectedPage';

interface CaseDetail {
  id: string;
  title: string;
  description: string;
  status: string;
  opponent?: string;
  timeline: string[];
  evidence: boolean;
  agreement: boolean;
  finalAnalysis?: string;
  createdAt: Date;
  updatedAt: Date;
  todos: any[];
  extractedDocs: any[];
}

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = params.caseId as string;
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await fetch(`/api/cases/${caseId}`);
        if (!res.ok) throw new Error('Failed to fetch case');
        const data = await res.json();
        setCaseDetail(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (caseId) fetchCase();
  }, [caseId]);

  if (loading) {
    return (
      <ProtectedPage>
        <div className="flex justify-center items-center h-96">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        </div>
      </ProtectedPage>
    );
  }

  if (error || !caseDetail) {
    return (
      <ProtectedPage>
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-200">
          {error || 'Case not found'}
        </div>
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <Link href="/dashboard">
          <Button variant="ghost" className="text-purple-400">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Case Title & Status */}
        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-500/20">
          <h1 className="text-4xl font-bold text-white mb-2">{caseDetail.title}</h1>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${caseDetail.status === 'OPEN' ? 'bg-blue-500/20 text-blue-300' :
                caseDetail.status === 'IN_PROGRESS' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-green-500/20 text-green-300'}`}>
              {caseDetail.status}
            </span>
            {caseDetail.opponent && (
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-4 h-4" />
                <span>vs. {caseDetail.opponent}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Case Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Description */}
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
              <h2 className="text-lg font-semibold text-white mb-2">Description</h2>
              <p className="text-gray-300">{caseDetail.description}</p>
            </div>

            {/* Timeline */}
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
              <h2 className="text-lg font-semibold text-white mb-3">Timeline</h2>
              <ul className="space-y-2">
                {caseDetail.timeline.map((event, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    {event}
                  </li>
                ))}
              </ul>
            </div>

            {/* Final Analysis */}
            {caseDetail.finalAnalysis && (
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <h2 className="text-lg font-semibold text-white mb-2">AI Analysis</h2>
                <div className="text-gray-300 prose prose-invert max-w-none">
                  {caseDetail.finalAnalysis}
                </div>
              </div>
            )}

            {/* Evidence & Agreement */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">Evidence</span>
                </div>
                <p className="text-xl font-bold text-white">
                  {caseDetail.evidence ? '✓ Yes' : '✗ No'}
                </p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">Agreement</span>
                </div>
                <p className="text-xl font-bold text-white">
                  {caseDetail.agreement ? '✓ Yes' : '✗ No'}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Actions */}
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
              <h3 className="font-semibold text-white mb-3">Actions</h3>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button className="w-full" variant="outline">
                  Edit Case
                </Button>
              </div>
            </div>

            {/* Todos */}
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
              <h3 className="font-semibold text-white mb-3">Tasks ({caseDetail.todos.length})</h3>
              <ul className="space-y-2">
                {caseDetail.todos.slice(0, 5).map(todo => (
                  <li key={todo.id} className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm text-gray-300">{todo.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents */}
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
              <h3 className="font-semibold text-white mb-3">Documents ({caseDetail.extractedDocs.length})</h3>
              <ul className="space-y-1">
                {caseDetail.extractedDocs.slice(0, 5).map(doc => (
                  <li key={doc.id}>
                    <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
                      {doc.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
```

---

## ✅ Step 5: Implement GET /api/cases/[caseId] (20 mins)

**File:** `src/app/api/cases/[caseId]/route.ts` (CREATE NEW)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { caseId: string } }
) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { caseId } = params;

    // Fetch case with all relations
    const caseDetail = await prisma.case.findUnique({
      where: { id: caseId },
      include: {
        todos: {
          orderBy: { createdAt: 'desc' }
        },
        extractedDocs: {
          orderBy: { createdAt: 'desc' }
        },
        laws: true,
        session: true,
      }
    });

    if (!caseDetail) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    // Verify ownership
    if (caseDetail.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(caseDetail);
  } catch (error) {
    console.error('[Case Detail] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
```

---

## ✅ Step 6: Update Dashboard Redux Actions (15 mins)

**File:** `src/app/store/slices/caseSlice.ts`

Add these thunks:

```typescript
export const createCase = createAsyncThunk(
  'cases/createCase',
  async (caseData: Omit<CaseData, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch('/api/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(caseData)
    });
    if (!response.ok) throw new Error('Failed to create case');
    return response.json();
  }
);

export const updateCase = createAsyncThunk(
  'cases/updateCase',
  async (caseData: Partial<CaseData> & { id: string }) => {
    const { id, ...data } = caseData;
    const response = await fetch(`/api/cases/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update case');
    return response.json();
  }
);

export const deleteCase = createAsyncThunk(
  'cases/deleteCase',
  async (caseId: string) => {
    const response = await fetch(`/api/cases/${caseId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete case');
    return caseId;
  }
);
```

Add to `extraReducers`:

```typescript
builder
  .addCase(createCase.pending, (state) => {
    state.loading = true;
  })
  .addCase(createCase.fulfilled, (state, action) => {
    state.loading = false;
    state.cases.unshift(action.payload);
  })
  .addCase(createCase.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || 'Failed to create case';
  })
  .addCase(deleteCase.fulfilled, (state, action) => {
    state.cases = state.cases.filter(c => c.id !== action.payload);
  });
```

---

## ✅ Step 7: Run Tests (5 mins)

```bash
# Build check
npm run build

# Lint check
npm run lint

# Start dev server
npm run dev
```

---

## Validation Checklist

After completing all steps, verify:

- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes
- [ ] Database migration applied successfully
- [ ] `/dashboard` page loads
- [ ] Can click case to go to detail page
- [ ] Case detail page displays all information
- [ ] No console errors in browser DevTools
- [ ] Redux DevTools shows correct state

---

## Next: Start Working on Priority Tasks

Once these steps are done:

1. **Implement remaining Case CRUD** (POST, PUT, DELETE)
2. **Implement Todo endpoints** (PUT [id], DELETE [id])
3. **Build test coverage**
4. **Optimize database queries**
5. **Add error boundaries**

**Total time to complete:** ~2.5 hours

---

**Pro Tips:**
- Test each endpoint with Postman/REST Client before wiring to UI
- Watch Redux DevTools to see state changes
- Check browser console for errors
- Always verify auth before testing endpoints
- Use `prisma studio` to inspect database changes

