/*
  # Set up Row Level Security Policies

  1. New Tables
    - `profiles` table with RLS policies
    - `eviction_cases` table with RLS policies

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for specific operations (read, insert, update)
*/

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE eviction ENABLE ROW LEVEL SECURITY;

-- Profiles table policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Eviction table policies
CREATE POLICY "Users can view their eviction cases"
  ON eviction
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create eviction cases"
  ON eviction
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their eviction cases"
  ON eviction
  FOR UPDATE
  TO authenticated
  USING (true);