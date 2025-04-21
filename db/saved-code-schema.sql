-- Create table for saving code
CREATE TABLE IF NOT EXISTS saved_code (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create index for faster retrieval
CREATE INDEX IF NOT EXISTS saved_code_user_id_idx ON saved_code(user_id);

-- RLS Policies
ALTER TABLE saved_code ENABLE ROW LEVEL SECURITY;

-- Users can only see their own code
CREATE POLICY "Users can view their own code" ON saved_code
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own code
CREATE POLICY "Users can insert their own code" ON saved_code
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own code
CREATE POLICY "Users can update their own code" ON saved_code
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own code
CREATE POLICY "Users can delete their own code" ON saved_code
  FOR DELETE USING (auth.uid() = user_id);
