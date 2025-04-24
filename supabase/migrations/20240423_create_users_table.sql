-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  profession TEXT,
  legal_knowledge TEXT NOT NULL,
  jail_time_years INTEGER,
  warning_severity TEXT,
  pending_case_type TEXT,
  language TEXT NOT NULL,
  legal_involvements TEXT[],
  fines TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_legal_knowledge ON users(legal_knowledge);
CREATE INDEX IF NOT EXISTS idx_users_profession ON users(profession);

-- Add RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own data
CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Policy for users to update their own data
CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Policy for users to insert their own data
CREATE POLICY "Users can insert their own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id); 