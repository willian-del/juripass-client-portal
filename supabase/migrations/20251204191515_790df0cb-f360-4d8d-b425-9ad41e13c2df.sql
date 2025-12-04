-- Fix search_path for generate_numero_cliente
CREATE OR REPLACE FUNCTION public.generate_numero_cliente()
 RETURNS text
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
DECLARE
  next_num INTEGER;
  new_numero TEXT;
BEGIN
  next_num := nextval('numero_cliente_seq');
  new_numero := 'JP-' || LPAD(next_num::TEXT, 7, '0');
  RETURN new_numero;
END;
$function$;

-- Fix search_path for encrypt_cpf (needs extensions schema for digest function)
CREATE OR REPLACE FUNCTION public.encrypt_cpf(cpf_plain text)
 RETURNS text
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
  SELECT encode(extensions.digest(cpf_plain, 'sha256'), 'hex')
$function$;