
-- Add qualification and CRM columns to leads table
ALTER TABLE public.leads
  ADD COLUMN employee_count text,
  ADD COLUMN department text,
  ADD COLUMN seniority text,
  ADD COLUMN interest text,
  ADD COLUMN evaluating_psychosocial text,
  ADD COLUMN has_legal_benefit text,
  ADD COLUMN lead_score integer DEFAULT 0,
  ADD COLUMN lead_priority text DEFAULT 'normal',
  ADD COLUMN funnel_stage text DEFAULT 'novo',
  ADD COLUMN notes text DEFAULT '',
  ADD COLUMN contacted_at timestamptz;

-- Create scoring function
CREATE OR REPLACE FUNCTION public.calculate_lead_score()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  score integer := 0;
  priority text := 'cold';
BEGIN
  -- Employee count scoring
  IF NEW.employee_count = '500_1000' THEN score := score + 20;
  ELSIF NEW.employee_count = '1000_plus' THEN score := score + 30;
  END IF;

  -- Department scoring
  IF NEW.department = 'rh' THEN score := score + 15;
  ELSIF NEW.department = 'compliance' THEN score := score + 10;
  END IF;

  -- Seniority scoring
  IF NEW.seniority IN ('diretor', 'socio') THEN score := score + 20;
  ELSIF NEW.seniority = 'gerente' THEN score := score + 10;
  END IF;

  -- Interest scoring
  IF NEW.interest IN ('nr01', 'passivo_trabalhista') THEN score := score + 15;
  END IF;

  -- Psychosocial evaluation scoring
  IF NEW.evaluating_psychosocial = 'sim' THEN score := score + 10;
  END IF;

  -- Legal benefit scoring
  IF NEW.has_legal_benefit = 'nao' THEN score := score + 10;
  END IF;

  -- Determine priority
  IF score >= 60 THEN priority := 'hot';
  ELSIF score >= 35 THEN priority := 'warm';
  ELSIF score >= 15 THEN priority := 'normal';
  ELSE priority := 'cold';
  END IF;

  NEW.lead_score := score;
  NEW.lead_priority := priority;

  RETURN NEW;
END;
$$;

-- Create trigger
CREATE TRIGGER trigger_calculate_lead_score
  BEFORE INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_lead_score();

-- Add RLS policy for admin to read and update leads
-- Create user_roles table for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
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

-- Drop existing restrictive select policy
DROP POLICY IF EXISTS "Only service role can read leads" ON public.leads;

-- Admin can read all leads
CREATE POLICY "Admins can read leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admin can update leads (notes, funnel_stage, contacted_at)
CREATE POLICY "Admins can update leads"
  ON public.leads
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
