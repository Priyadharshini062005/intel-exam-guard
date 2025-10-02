-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'teacher', 'student');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid());

-- Create exams table
CREATE TABLE public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  course TEXT NOT NULL,
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  total_points INTEGER NOT NULL DEFAULT 0,
  duration_minutes INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

-- Create exam_attempts table
CREATE TABLE public.exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID REFERENCES public.exams(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress',
  score INTEGER,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  submitted_at TIMESTAMP WITH TIME ZONE,
  is_locked BOOLEAN DEFAULT false,
  lock_reason TEXT,
  UNIQUE (exam_id, student_id)
);

ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;

-- Create violations table
CREATE TABLE public.violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES public.exam_attempts(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.violations ENABLE ROW LEVEL SECURITY;

-- Create exam_answers table
CREATE TABLE public.exam_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES public.exam_attempts(id) ON DELETE CASCADE NOT NULL,
  question_id INTEGER NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (attempt_id, question_id)
);

ALTER TABLE public.exam_answers ENABLE ROW LEVEL SECURITY;

-- RLS policies for exams
CREATE POLICY "Teachers can view their own exams"
ON public.exams
FOR SELECT
TO authenticated
USING (teacher_id = auth.uid() OR public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Teachers can create exams"
ON public.exams
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'teacher'));

-- RLS policies for exam_attempts
CREATE POLICY "Students can view their own attempts"
ON public.exam_attempts
FOR SELECT
TO authenticated
USING (student_id = auth.uid());

CREATE POLICY "Teachers can view attempts for their exams"
ON public.exam_attempts
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.exams
    WHERE exams.id = exam_attempts.exam_id
    AND exams.teacher_id = auth.uid()
  )
);

CREATE POLICY "Students can create their own attempts"
ON public.exam_attempts
FOR INSERT
TO authenticated
WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their own attempts"
ON public.exam_attempts
FOR UPDATE
TO authenticated
USING (student_id = auth.uid());

CREATE POLICY "Teachers can update attempts for their exams"
ON public.exam_attempts
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.exams
    WHERE exams.id = exam_attempts.exam_id
    AND exams.teacher_id = auth.uid()
  )
);

-- RLS policies for violations
CREATE POLICY "Students can view their own violations"
ON public.violations
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.exam_attempts
    WHERE exam_attempts.id = violations.attempt_id
    AND exam_attempts.student_id = auth.uid()
  )
);

CREATE POLICY "Teachers can view violations for their exams"
ON public.violations
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.exam_attempts
    JOIN public.exams ON exams.id = exam_attempts.exam_id
    WHERE exam_attempts.id = violations.attempt_id
    AND exams.teacher_id = auth.uid()
  )
);

CREATE POLICY "System can create violations"
ON public.violations
FOR INSERT
TO authenticated
WITH CHECK (true);

-- RLS policies for exam_answers
CREATE POLICY "Students can view their own answers"
ON public.exam_answers
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.exam_attempts
    WHERE exam_attempts.id = exam_answers.attempt_id
    AND exam_attempts.student_id = auth.uid()
  )
);

CREATE POLICY "Students can insert their own answers"
ON public.exam_answers
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.exam_attempts
    WHERE exam_attempts.id = exam_answers.attempt_id
    AND exam_attempts.student_id = auth.uid()
  )
);

CREATE POLICY "Students can update their own answers"
ON public.exam_answers
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.exam_attempts
    WHERE exam_attempts.id = exam_answers.attempt_id
    AND exam_attempts.student_id = auth.uid()
  )
);

CREATE POLICY "Teachers can view answers for their exams"
ON public.exam_answers
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.exam_attempts
    JOIN public.exams ON exams.id = exam_attempts.exam_id
    WHERE exam_attempts.id = exam_answers.attempt_id
    AND exams.teacher_id = auth.uid()
  )
);

-- Create update trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_exams_updated_at
  BEFORE UPDATE ON public.exams
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_exam_answers_updated_at
  BEFORE UPDATE ON public.exam_answers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();