import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Upload, FileSpreadsheet, CheckCircle, XCircle, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CSVRow {
  cpf: string;
  nome: string;
  email: string;
  telefone?: string;
  tipo_usuario?: string;
}

interface ImportResult {
  success: boolean;
  row: number;
  email: string;
  error?: string;
}

interface ImportCSVDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  empresaId: string;
  onSuccess: () => void;
}

export function ImportCSVDialog({
  open,
  onOpenChange,
  empresaId,
  onSuccess,
}: ImportCSVDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<CSVRow[]>([]);
  const [importResults, setImportResults] = useState<ImportResult[] | null>(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (content: string): CSVRow[] => {
    const lines = content.trim().split('\n');
    const headers = lines[0].toLowerCase().split(';').map((h) => h.trim());
    
    const cpfIndex = headers.findIndex((h) => h.includes('cpf'));
    const nomeIndex = headers.findIndex((h) => h.includes('nome'));
    const emailIndex = headers.findIndex((h) => h.includes('email'));
    const telefoneIndex = headers.findIndex((h) => h.includes('telefone') || h.includes('celular'));
    const tipoIndex = headers.findIndex((h) => h.includes('tipo'));

    if (cpfIndex === -1 || nomeIndex === -1 || emailIndex === -1) {
      throw new Error('CSV deve conter colunas: CPF, Nome, Email');
    }

    return lines.slice(1).filter(line => line.trim()).map((line) => {
      const values = line.split(';').map((v) => v.trim());
      return {
        cpf: values[cpfIndex] || '',
        nome: values[nomeIndex] || '',
        email: values[emailIndex] || '',
        telefone: telefoneIndex >= 0 ? values[telefoneIndex] : undefined,
        tipo_usuario: tipoIndex >= 0 ? values[tipoIndex]?.toLowerCase() : 'principal',
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setImportResults(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = parseCSV(content);
        setPreviewData(data);
      } catch (error: any) {
        toast.error(error.message || 'Erro ao ler arquivo CSV');
        setPreviewData([]);
      }
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (previewData.length === 0) {
      toast.error('Nenhum dado para importar');
      return;
    }

    setIsLoading(true);
    setImportResults(null);

    try {
      const { data, error } = await supabase.functions.invoke('import-users', {
        body: {
          id_empresa: empresaId,
          filename: fileName,
          users: previewData.map((row) => ({
            cpf: row.cpf.replace(/\D/g, ''),
            nome: row.nome,
            email: row.email,
            telefone: row.telefone?.replace(/\D/g, '') || null,
            tipo_usuario: row.tipo_usuario || 'principal',
          })),
        },
      });

      if (error) throw error;

      setImportResults(data.results || []);

      if (data.success_count > 0) {
        toast.success(
          `${data.success_count} beneficiário(s) importado(s) com sucesso!`
        );
        onSuccess();
      }

      if (data.failure_count > 0) {
        toast.error(`${data.failure_count} registro(s) falharam`);
      }
    } catch (error: any) {
      console.error('Import error:', error);
      toast.error('Erro ao importar beneficiários');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const template = 'CPF;Nome;Email;Telefone;Tipo\n000.000.000-00;João da Silva;joao@email.com;(11) 99999-9999;principal';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modelo_importacao.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetDialog = () => {
    setPreviewData([]);
    setImportResults(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetDialog();
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Importar Beneficiários via CSV
          </DialogTitle>
          <DialogDescription>
            Faça upload de um arquivo CSV com os dados dos beneficiários
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              O arquivo deve conter as colunas: <strong>CPF</strong>,{' '}
              <strong>Nome</strong>, <strong>Email</strong>. Opcionalmente:{' '}
              <strong>Telefone</strong>, <strong>Tipo</strong> (principal/dependente).
              Use ponto e vírgula (;) como separador.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownloadTemplate}>
              <Download className="mr-2 h-4 w-4" />
              Baixar Modelo
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-upload"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <Upload className="mr-2 h-4 w-4" />
              Selecionar Arquivo
            </Button>
            {fileName && (
              <span className="text-sm text-muted-foreground">{fileName}</span>
            )}
          </div>

          {previewData.length > 0 && !importResults && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CPF</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tipo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.slice(0, 5).map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-sm">{row.cpf}</TableCell>
                      <TableCell>{row.nome}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.tipo_usuario || 'principal'}</TableCell>
                    </TableRow>
                  ))}
                  {previewData.length > 5 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        ... e mais {previewData.length - 5} registro(s)
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {importResults && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mensagem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {importResults.map((result, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {result.success ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-destructive" />
                        )}
                      </TableCell>
                      <TableCell>{result.email}</TableCell>
                      <TableCell className="text-sm">
                        {result.success ? 'Importado com sucesso' : result.error}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {importResults ? 'Fechar' : 'Cancelar'}
          </Button>
          {!importResults && (
            <Button
              onClick={handleImport}
              disabled={isLoading || previewData.length === 0}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importando...
                </>
              ) : (
                `Importar ${previewData.length} registro(s)`
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
