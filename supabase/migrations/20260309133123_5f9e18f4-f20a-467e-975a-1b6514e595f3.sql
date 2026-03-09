
-- Fix: Add RLS policy to user_roles table
CREATE POLICY "Users can read own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Fix: Set search_path on calculate_lead_score function
CREATE OR REPLACE FUNCTION public.calculate_lead_score()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  score integer := 0;
  priority text := 'cold';
BEGIN
  IF NEW.employee_count = '500_1000' THEN score := score + 20;
  ELSIF NEW.employee_count = '1000_plus' THEN score := score + 30;
  END IF;
  IF NEW.department = 'rh' THEN score := score + 15;
  ELSIF NEW.department = 'compliance' THEN score := score + 10;
  END IF;
  IF NEW.seniority IN ('diretor', 'socio') THEN score := score + 20;
  ELSIF NEW.seniority = 'gerente' THEN score := score + 10;
  END IF;
  IF NEW.interest IN ('nr01', 'passivo_trabalhista') THEN score := score + 15;
  END IF;
  IF NEW.evaluating_psychosocial = 'sim' THEN score := score + 10;
  END IF;
  IF NEW.has_legal_benefit = 'nao' THEN score := score + 10;
  END IF;
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
