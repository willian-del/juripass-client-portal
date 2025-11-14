import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Upload, Download, CheckCircle2, XCircle, AlertCircle, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { validateCPF, cleanCPF, formatCPF, cleanPhone } from '@/lib/cpfUtils';

interface UserImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface ParsedUser {
  row: number;
  cpf: string;
  nome: string;
  email: string;
  telefone?: string;
  tipo_usuario: 'principal' | 'dependente';
  grau_parentesco?: string;
  cpf_usuario_principal?: string;
  valid: boolean;
  errors: string[];
}

interface ImportResult {
  import_id: string;
  total: number;
  successful: number;
  failed: number;
  results: {
    row: number;
    cpf: string;
    nome: string;
    success: boolean;
    numero_cliente?: string;
    error?: string;
  }[];
}

export function UserImportDialog({ open, onOpenChange, onSuccess }: UserImportDialogProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedUser[]>([]);
  const [importOnlyValid, setImportOnlyValid] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const { usuario } = useAuth();

  const downloadTemplate = () => {
    const template = `cpf,nome,email,telefone,tipo_usuario,grau_parentesco,cpf_usuario_principal
12345678901,João Silva,joao@example.com,11987654321,principal,,
98765432100,Maria Silva,maria@example.com,11987654322,dependente,conjuge,12345678901
11122233344,Pedro Silva,pedro@example.com,,dependente,filho,12345678901`;
    
    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'template_importacao_usuarios.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(csv|xlsx)$/i)) {
      toast({
        title: 'Formato inválido',
        description: 'Por favor, selecione um arquivo CSV ou XLSX.',
        variant: 'destructive',
      });
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        title: 'Arquivo muito grande',
        description: 'O arquivo deve ter no máximo 5MB.',
        variant: 'destructive',
      });
      return;
    }

    setFile(selectedFile);
  };

  const parseCSV = (text: string): ParsedUser[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const requiredHeaders = ['cpf', 'nome', 'email', 'tipo_usuario'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

    if (missingHeaders.length > 0) {
      toast({
        title: 'Headers inválidos',
        description: `Faltam as colunas: ${missingHeaders.join(', ')}`,
        variant: 'destructive',
      });
      return [];
    }

    return lines.slice(1).map((line, index) => {
      const values = line.split(',').map(v => v.trim());
      const user: any = {};
      headers.forEach((header, i) => {
        user[header] = values[i] || '';
      });

      const errors: string[] = [];
      
      // Validar CPF
      const cpfClean = cleanCPF(user.cpf);
      if (!validateCPF(cpfClean)) {
        errors.push('CPF inválido');
      }

      // Validar nome
      if (!user.nome || user.nome.length < 3) {
        errors.push('Nome muito curto (mínimo 3 caracteres)');
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        errors.push('Email inválido');
      }

      // Validar telefone (opcional)
      if (user.telefone) {
        const phoneClean = cleanPhone(user.telefone);
        if (phoneClean.length !== 10 && phoneClean.length !== 11) {
          errors.push('Telefone inválido (deve ter 10 ou 11 dígitos)');
        }
      }

      // Validar tipo_usuario
      if (!['principal', 'dependente'].includes(user.tipo_usuario)) {
        errors.push("Tipo de usuário inválido (use 'principal' ou 'dependente')");
      }

      // Validações para dependente
      if (user.tipo_usuario === 'dependente') {
        if (!user.grau_parentesco) {
          errors.push('Grau de parentesco obrigatório para dependentes');
        } else if (!['conjuge', 'filho', 'pai_mae', 'irmao', 'outro'].includes(user.grau_parentesco)) {
          errors.push('Grau de parentesco inválido');
        }
        
        if (!user.cpf_usuario_principal) {
          errors.push('CPF do usuário principal obrigatório para dependentes');
        } else if (!validateCPF(cleanCPF(user.cpf_usuario_principal))) {
          errors.push('CPF do usuário principal inválido');
        }
      }

      return {
        row: index + 2, // +2 porque linha 1 é header e index começa em 0
        cpf: cpfClean,
        nome: user.nome,
        email: user.email,
        telefone: user.telefone ? cleanPhone(user.telefone) : undefined,
        tipo_usuario: user.tipo_usuario,
        grau_parentesco: user.grau_parentesco || undefined,
        cpf_usuario_principal: user.cpf_usuario_principal ? cleanCPF(user.cpf_usuario_principal) : undefined,
        valid: errors.length === 0,
        errors,
      };
    });
  };

  const handleParse = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const text = await file.text();
      const parsed = parseCSV(text);
      setParsedData(parsed);
      setStep(3);
      
      const validCount = parsed.filter(u => u.valid).length;
      toast({
        title: 'Arquivo processado',
        description: `${validCount} linhas válidas, ${parsed.length - validCount} com erro`,
      });
    } catch (error) {
      toast({
        title: 'Erro ao processar arquivo',
        description: 'Verifique se o arquivo está no formato correto.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = async () => {
    const dataToImport = importOnlyValid 
      ? parsedData.filter(u => u.valid)
      : parsedData;

    if (dataToImport.length === 0) {
      toast({
        title: 'Nenhum dado para importar',
        description: 'Todos os registros têm erros.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    setProgress(10);

    try {
      const usuarios = dataToImport.map(u => ({
        cpf: u.cpf,
        nome: u.nome,
        email: u.email,
        telefone: u.telefone,
        tipo_usuario: u.tipo_usuario,
        grau_parentesco: u.grau_parentesco,
        cpf_usuario_principal: u.cpf_usuario_principal,
      }));

      setProgress(30);

      const { data, error } = await supabase.functions.invoke('import-users', {
        body: {
          id_empresa: usuario?.id_empresa,
          filename: file?.name,
          usuarios,
        },
      });

      setProgress(90);

      if (error) throw error;

      setImportResult(data);
      setProgress(100);
      setStep(4);

      toast({
        title: 'Importação concluída',
        description: `${data.successful} usuários importados com sucesso`,
      });

      if (data.successful > 0) {
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: 'Erro na importação',
        description: error.message || 'Erro ao processar importação',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadReport = () => {
    if (!importResult) return;

    const csvRows = [
      'Linha,CPF,Nome,Status,Número Cliente,Erro',
      ...importResult.results.map(r => 
        `${r.row},"${formatCPF(r.cpf)}","${r.nome}",${r.success ? 'Sucesso' : 'Falha'},"${r.numero_cliente || ''}","${r.error || ''}"`
      )
    ];

    const csv = csvRows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio_importacao_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setStep(1);
    setFile(null);
    setParsedData([]);
    setImportResult(null);
    setProgress(0);
    setImportOnlyValid(true);
    onOpenChange(false);
  };

  const validCount = parsedData.filter(u => u.valid).length;
  const invalidCount = parsedData.length - validCount;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Importar Usuários em Lote</DialogTitle>
          <DialogDescription>
            Etapa {step} de 4 - {
              step === 1 ? 'Upload do arquivo' :
              step === 2 ? 'Processando...' :
              step === 3 ? 'Revisar dados' :
              'Relatório de importação'
            }
          </DialogDescription>
        </DialogHeader>

        {/* Etapa 1: Upload */}
        {step === 1 && (
          <div className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Formato esperado:</strong> Arquivo CSV com colunas: cpf, nome, email, telefone (opcional), 
                tipo_usuario, grau_parentesco (para dependentes), cpf_usuario_principal (para dependentes)
              </AlertDescription>
            </Alert>

            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 space-y-4">
              <FileText className="h-16 w-16 text-muted-foreground" />
              <div className="text-center">
                <p className="text-lg font-medium">Selecione um arquivo CSV ou XLSX</p>
                <p className="text-sm text-muted-foreground">Máximo 5MB</p>
              </div>
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button type="button" asChild>
                  <span className="gap-2 cursor-pointer">
                    <Upload className="h-4 w-4" />
                    Escolher arquivo
                  </span>
                </Button>
              </label>
              {file && (
                <p className="text-sm text-muted-foreground">
                  Arquivo selecionado: <strong>{file.name}</strong>
                </p>
              )}
            </div>

            <Button variant="outline" onClick={downloadTemplate} className="w-full gap-2">
              <Download className="h-4 w-4" />
              Download Template CSV
            </Button>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleParse} disabled={!file || isProcessing}>
                {isProcessing ? 'Processando...' : 'Próximo'}
              </Button>
            </div>
          </div>
        )}

        {/* Etapa 3: Preview */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Total: {parsedData.length} linhas
                </p>
                <div className="flex gap-4 text-sm">
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    {validCount} válidas
                  </span>
                  <span className="flex items-center gap-1 text-destructive">
                    <XCircle className="h-4 w-4" />
                    {invalidCount} com erro
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="import-valid"
                  checked={importOnlyValid}
                  onCheckedChange={(checked) => setImportOnlyValid(checked as boolean)}
                />
                <Label htmlFor="import-valid">Importar apenas válidos</Label>
              </div>
            </div>

            <div className="border rounded-lg max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Status</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Erros</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedData.slice(0, 50).map((user) => (
                    <TableRow key={user.row}>
                      <TableCell>
                        {user.valid ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-destructive" />
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{formatCPF(user.cpf)}</TableCell>
                      <TableCell>{user.nome}</TableCell>
                      <TableCell className="text-xs">{user.email}</TableCell>
                      <TableCell>{user.tipo_usuario}</TableCell>
                      <TableCell className="text-xs text-destructive">
                        {user.errors.join(', ')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {parsedData.length > 50 && (
              <p className="text-xs text-muted-foreground text-center">
                Mostrando primeiras 50 linhas de {parsedData.length}
              </p>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>Voltar</Button>
              <Button onClick={handleImport} disabled={isProcessing || (importOnlyValid && validCount === 0)}>
                {isProcessing ? 'Importando...' : `Importar ${importOnlyValid ? validCount : parsedData.length} usuários`}
              </Button>
            </div>
          </div>
        )}

        {/* Etapa 4: Relatório */}
        {step === 4 && importResult && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">{importResult.total}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{importResult.successful}</p>
                <p className="text-sm text-muted-foreground">Sucessos</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-destructive">{importResult.failed}</p>
                <p className="text-sm text-muted-foreground">Falhas</p>
              </div>
            </div>

            {importResult.successful > 0 && (
              <div>
                <h3 className="font-medium mb-2">Usuários Importados com Sucesso</h3>
                <div className="border rounded-lg max-h-48 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>CPF</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Número Cliente</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {importResult.results.filter(r => r.success).map((result, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-mono text-xs">{formatCPF(result.cpf)}</TableCell>
                          <TableCell>{result.nome}</TableCell>
                          <TableCell className="font-medium">{result.numero_cliente}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {importResult.failed > 0 && (
              <div>
                <h3 className="font-medium mb-2">Erros na Importação</h3>
                <div className="border rounded-lg max-h-48 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Linha</TableHead>
                        <TableHead>CPF</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Erro</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {importResult.results.filter(r => !r.success).map((result, i) => (
                        <TableRow key={i}>
                          <TableCell>{result.row}</TableCell>
                          <TableCell className="font-mono text-xs">{formatCPF(result.cpf)}</TableCell>
                          <TableCell>{result.nome}</TableCell>
                          <TableCell className="text-xs text-destructive">{result.error}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={downloadReport} className="gap-2">
                <Download className="h-4 w-4" />
                Download Relatório
              </Button>
              <Button onClick={handleClose}>Fechar</Button>
            </div>
          </div>
        )}

        {/* Progress bar durante processamento */}
        {isProcessing && step === 3 && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-center text-muted-foreground">Processando importação...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
