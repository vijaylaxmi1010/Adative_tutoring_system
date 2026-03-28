-- =============================================================
-- Adaptive Tutoring System - Supabase Schema
-- =============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- =============================================================
-- STUDENTS TABLE
-- =============================================================
create table if not exists students (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  age integer not null check (age between 8 and 18),
  grade text not null,
  preference text not null check (preference in ('video', 'text')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Row Level Security for students
alter table students enable row level security;

create policy "Students can read their own data"
  on students for select
  using (id::text = auth.uid()::text);

create policy "Students can insert their own data"
  on students for insert
  with check (id::text = auth.uid()::text);

create policy "Students can update their own data"
  on students for update
  using (id::text = auth.uid()::text);

-- =============================================================
-- TOPIC PROGRESS TABLE
-- =============================================================
create table if not exists topic_progress (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references students(id) on delete cascade,
  topic_id text not null,
  is_unlocked boolean default false,
  is_completed boolean default false,
  p_l decimal(5,4) default 0.1,
  p_l0 decimal(5,4) default 0.1,
  p_t decimal(5,4) default 0.1,
  p_g decimal(5,4) default 0.2,
  p_s decimal(5,4) default 0.1,
  pre_assessment_score decimal(5,4),
  student_level text check (student_level in ('low', 'medium', 'high')),
  assessment_score decimal(5,4),
  hints_used integer default 0,
  total_questions integer default 0,
  correct_answers integer default 0,
  weak_subtopics text[] default '{}',
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(student_id, topic_id)
);

-- Indexes for performance
create index if not exists idx_topic_progress_student_id on topic_progress(student_id);
create index if not exists idx_topic_progress_topic_id on topic_progress(topic_id);
create index if not exists idx_topic_progress_completed on topic_progress(is_completed);

-- Row Level Security for topic_progress
alter table topic_progress enable row level security;

create policy "Students can read their own progress"
  on topic_progress for select
  using (student_id::text = auth.uid()::text);

create policy "Students can insert their own progress"
  on topic_progress for insert
  with check (student_id::text = auth.uid()::text);

create policy "Students can update their own progress"
  on topic_progress for update
  using (student_id::text = auth.uid()::text);

-- =============================================================
-- QUESTION RESPONSES TABLE
-- =============================================================
create table if not exists question_responses (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references students(id) on delete cascade,
  question_id text not null,
  topic_id text not null,
  is_correct boolean not null,
  hints_used integer default 0,
  time_taken_seconds integer default 0,
  selected_answer text,
  created_at timestamp with time zone default now()
);

-- Indexes
create index if not exists idx_responses_student_id on question_responses(student_id);
create index if not exists idx_responses_topic_id on question_responses(topic_id);
create index if not exists idx_responses_question_id on question_responses(question_id);

-- Row Level Security for question_responses
alter table question_responses enable row level security;

create policy "Students can read their own responses"
  on question_responses for select
  using (student_id::text = auth.uid()::text);

create policy "Students can insert their own responses"
  on question_responses for insert
  with check (student_id::text = auth.uid()::text);

-- =============================================================
-- UPDATED_AT TRIGGER
-- =============================================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_students_updated_at
  before update on students
  for each row execute function update_updated_at_column();

create trigger update_topic_progress_updated_at
  before update on topic_progress
  for each row execute function update_updated_at_column();

-- =============================================================
-- VIEWS FOR ANALYTICS
-- =============================================================

-- Student performance summary view
create or replace view student_performance_summary as
select
  s.id as student_id,
  s.name as student_name,
  s.grade,
  count(tp.id) filter (where tp.is_completed) as topics_completed,
  count(tp.id) as topics_unlocked,
  avg(tp.p_l) as avg_knowledge,
  sum(tp.hints_used) as total_hints_used,
  sum(tp.correct_answers) as total_correct,
  sum(tp.total_questions) as total_questions_answered
from students s
left join topic_progress tp on s.id = tp.student_id
group by s.id, s.name, s.grade;
