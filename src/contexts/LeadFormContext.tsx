import React, { createContext, useContext, useState, useCallback } from 'react';
import { LeadFormDialog } from '@/components/ui/LeadFormDialog';

interface LeadFormContextType {
  open: () => void;
}

const LeadFormContext = createContext<LeadFormContextType | null>(null);

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error('useLeadForm must be used within LeadFormProvider');
  return ctx;
}

export function LeadFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);

  return (
    <LeadFormContext.Provider value={{ open }}>
      {children}
      <LeadFormDialog open={isOpen} onOpenChange={setIsOpen} />
    </LeadFormContext.Provider>
  );
}
