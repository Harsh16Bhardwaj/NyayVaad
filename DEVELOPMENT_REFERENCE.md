# Development Reference & Patterns 📖

## Common Patterns You'll See

### Pattern 1: Protected API Route with Error Handling

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  // 1. Check authentication
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // 2. Parse and validate input
    const body = await request.json();
    const { requiredField, optionalField } = body;
    
    if (!requiredField) {
      return NextResponse.json(
        { error: 'Missing required field' },
        { status: 400 }
      );
    }

    // 3. Verify user ownership (if modifying user's data)
    const userRecord = await prisma.user.findUnique({
      where: { clerkId: userId }
    });
    
    if (!userRecord) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // 4. Perform database operation
    const result = await prisma.someModel.create({
      data: {
        field: requiredField,
        userId: userRecord.id, // Always link to user
      }
    });

    // 5. Return success
    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    // 6. Log error for debugging
    console.error('[ROUTE_NAME] Error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    // 7. Clean up database connection
    await prisma.$disconnect();
  }
}
```

### Pattern 2: Redux Async Thunk

```typescript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define the thunk
export const fetchData = createAsyncThunk(
  'slice/fetchData',  // namespace/action
  async (arg: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/endpoint/${arg}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

// Create the slice
const slice = createSlice({
  name: 'sliceName',
  initialState: {
    data: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle fulfilled state
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      // Handle rejected state
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default slice.reducer;
```

### Pattern 3: Client Component with Redux

```typescript
'use client'; // IMPORTANT: Must be at top!

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { fetchData } from '@/app/store/slices/slice';

export default function ComponentName() {
  const dispatch = useDispatch<AppDispatch>();
  
  // Select state
  const { data, loading, error } = useSelector(
    (state: RootState) => state.sliceName
  );

  // Fetch on mount
  useEffect(() => {
    dispatch(fetchData('param'));
  }, [dispatch]);

  // Handle states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  // Render
  return (
    <div>
      {/* Use data */}
    </div>
  );
}
```

### Pattern 4: Protected Page with Auth Check

```typescript
'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthModal from './AuthModal';

interface ProtectedPageProps {
  children: React.ReactNode;
}

export default function ProtectedPage({ children }: ProtectedPageProps) {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setShowModal(true);
    }
  }, [isLoaded, isSignedIn]);

  const handleClose = () => {
    setShowModal(false);
    router.push('/');
  };

  if (!isLoaded) return null; // Don't render until auth loads
  
  if (!isSignedIn) {
    return <AuthModal isOpen={showModal} onClose={handleClose} />;
  }

  return <>{children}</>;
}
```

### Pattern 5: Streaming API Response

```typescript
export async function POST(req: NextRequest) {
  try {
    // Create a stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Do async work
          const result = await someAsyncFunction();

          // Send data through stream
          controller.enqueue(new TextEncoder().encode(
            JSON.stringify(result) + '\n'
          ));

          // Close stream
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    // Return stream with proper headers
    return new Response(stream, {
      headers: {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error' },
      { status: 500 }
    );
  }
}
```

---

## Key Hooks & Utilities

### useUser() - Clerk
```typescript
const { isSignedIn, isLoaded, user } = useUser();
// Access user data: user?.id, user?.email, user?.fullName
```

### useDispatch & useSelector - Redux
```typescript
const dispatch = useDispatch<AppDispatch>();
const data = useSelector((state: RootState) => state.slice.field);
```

### useRouter & useParams - Next.js
```typescript
const router = useRouter();
const params = useParams();

router.push('/page');           // Navigate
router.replace('/page');        // Replace history
const id = params.id as string; // Get route params
```

---

## TypeScript Types Reference

### Prisma-generated types

Located in `src/generated/prisma/`:

```typescript
import { User, Case, Todo, Session } from '@/generated/prisma';

// Use these for strict typing
const user: User = { /* ... */ };
const caseData: Case = { /* ... */ };
```

### Custom app types

Located in `src/types/case.ts`:

```typescript
import { CaseData, CaseWithRelations, Todo, Session } from '@/types/case';
```

---

## Common Mistakes to Avoid

### ❌ Don't Forget 'use client'
```typescript
// ❌ WRONG - Has hooks but no 'use client'
export default function Component() {
  const [state, setState] = useState();
  // Error: Can't use hooks in server component
}

// ✅ CORRECT
'use client';
export default function Component() {
  const [state, setState] = useState();
}
```

### ❌ Don't Forget Auth Checks
```typescript
// ❌ WRONG - No auth check
export async function POST(req: Request) {
  const body = await req.json();
  await prisma.case.create({ data: body });
}

// ✅ CORRECT
export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});
  
  const body = await req.json();
  await prisma.case.create({
    data: { ...body, userId }
  });
}
```

### ❌ Don't Forget Cleanup
```typescript
// ❌ WRONG - Doesn't disconnect Prisma
export async function GET() {
  const data = await prisma.model.findMany();
  return NextResponse.json(data);
}

// ✅ CORRECT
export async function GET() {
  try {
    const data = await prisma.model.findMany();
    return NextResponse.json(data);
  } finally {
    await prisma.$disconnect();
  }
}
```

### ❌ Don't Forget Error Handling
```typescript
// ❌ WRONG - No error handling
const data = await fetch(url).then(r => r.json());

// ✅ CORRECT
try {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Request failed');
  const data = await res.json();
} catch (error) {
  console.error('Error:', error);
  // Handle error
}
```

### ❌ Don't Forget Type Safety
```typescript
// ❌ WRONG - Using any
const handleChange = (e: any) => {
  setState(e.target.value);
};

// ✅ CORRECT
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setState(e.target.value);
};
```

---

## Testing Checklist

Before committing code:

```
API Endpoint:
- [ ] Test with auth check (signed in user)
- [ ] Test without auth (should return 401)
- [ ] Test with invalid data (should return 400)
- [ ] Test with non-existent resource (should return 404)
- [ ] Test successful case (should return 200)
- [ ] Check console for errors

React Component:
- [ ] Renders without errors
- [ ] Loading state displays correctly
- [ ] Error state displays correctly
- [ ] Data displays when loaded
- [ ] Redux state updates correctly
- [ ] No console warnings

Database:
- [ ] Migration runs successfully
- [ ] Data persists correctly
- [ ] Relations work correctly
- [ ] Indexes are applied
```

---

## Debugging Tips

### 1. Redux DevTools
Add Redux state inspector in browser:
- Install Redux DevTools extension
- See state changes in real-time
- Time-travel debug

### 2. Console Logging Pattern
```typescript
// Tag your logs for easy filtering
console.log('[ComponentName] Message:', data);
console.error('[API Route] Error:', error);
console.warn('[Feature] Warning:', issue);

// In browser, filter by tag: [ComponentName]
```

### 3. Prisma Studio
```bash
npx prisma studio
# View/edit database in UI
```

### 4. Next.js DevTools
- Open in browser: Network tab shows API calls
- React Components tab for component tree
- Check source maps for TypeScript debugging

### 5. API Testing
```typescript
// Use Postman or VS Code REST Client
// Create .http file:
POST http://localhost:3000/api/cases
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Test Case",
  "description": "Test"
}
```

---

## File Organization Best Practices

```
Organize by feature/module:
src/
├── app/
│   ├── api/
│   │   └── feature/
│   │       ├── route.ts (main CRUD)
│   │       └── [id]/route.ts (specific item)
│   └── feature/
│       ├── page.tsx (main page)
│       └── [id]/page.tsx (detail page)
├── components/
│   ├── feature/
│   │   ├── FeatureList.tsx
│   │   ├── FeatureDetail.tsx
│   │   └── FeatureForm.tsx
│   └── ui/ (reusable)
├── store/slices/
│   └── featureSlice.ts (Redux for feature)
└── types/
    └── feature.ts (Feature types)
```

---

## Performance Optimization Tips

### 1. Database Queries
```typescript
// ❌ Slow - N+1 query problem
const cases = await prisma.case.findMany();
for (const c of cases) {
  const todos = await prisma.todo.findMany({
    where: { caseId: c.id }
  });
}

// ✅ Fast - Single query with relations
const cases = await prisma.case.findMany({
  include: { todos: true }
});
```

### 2. React Rendering
```typescript
// ❌ Slow - Renders parent re-renders all children
const Parent = ({ items }) => (
  <>
    {items.map(item => <Child key={item.id} {...item} />)}
  </>
);

// ✅ Fast - Memoized child components
const Child = React.memo(({ item }) => <div>{item.name}</div>);
```

### 3. Redux Selectors
```typescript
// ❌ Slow - Creates new object every render
const data = useSelector(state => ({
  cases: state.cases.cases,
  loading: state.cases.loading
}));

// ✅ Fast - Memoized selector
const cases = useSelector(state => state.cases.cases);
const loading = useSelector(state => state.cases.loading);
```

---

## Code Review Checklist

When reviewing code:

```
✓ Security
  - Auth checks present
  - Input validation exists
  - No sensitive data exposed

✓ Functionality
  - Feature works as specified
  - Edge cases handled
  - Error states managed

✓ Code Quality
  - TypeScript strict
  - No console logs in production
  - Consistent naming
  - DRY principle followed

✓ Performance
  - No unnecessary re-renders
  - Database queries optimized
  - No memory leaks

✓ Testing
  - Manual testing done
  - Happy path works
  - Error path works
```

---

## Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run lint            # Run ESLint

# Database
npx prisma migrate dev  # Create and run migration
npx prisma studio      # Open database GUI
npx prisma generate    # Regenerate types

# Debugging
npm run dev -- --turbopack  # With turbopack
NODE_OPTIONS='--inspect' npm run dev  # With V8 inspector

# Clean
rm -rf node_modules
npm install
npx prisma generate
```

---

**Last Updated:** February 13, 2026  
**Maintained By:** Development Team

