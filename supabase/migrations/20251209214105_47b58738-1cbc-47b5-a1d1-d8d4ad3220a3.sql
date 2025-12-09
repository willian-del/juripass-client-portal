-- Permitir NULL na coluna id_auth para suportar fluxo de Primeiro Acesso
-- Dependentes são criados sem id_auth e preenchem após criar senha

ALTER TABLE usuarios 
ALTER COLUMN id_auth DROP NOT NULL;