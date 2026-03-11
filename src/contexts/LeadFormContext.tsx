import React, { createContext, useContext, useState, useCallback } from 'react';
import { LeadFormDialog } from '@/components/ui/LeadFormDialog';

interface LeadFormContextType {
  open: () => void;
  hasSubmitted: boolean;
}

const LeadFormContext = createContext<LeadFormContextType | null>(null);

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error('useLeadForm must be used within LeadFormProvider');
  return ctx;
}

export function LeadFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);

  const handleSuccess = useCallback(() => {
    setHasSubmitted(true);
  }, []);

  return (
    <LeadFormContext.Provider value={{ open, hasSubmitted }}>
      {children}
      <LeadFormDialog open={isOpen} onOpenChange={setIsOpen} onSuccess={handleSuccess} />
    </LeadFormContext.Provider>
  );
}
