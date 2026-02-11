import { useState, createContext, useContext, ReactNode } from 'react';
import { MemberRole } from '@/data/memberHub';

interface HubContextValue {
  role: MemberRole | null;
  setRole: (r: MemberRole) => void;
  macroArea: string | null;
  setMacroArea: (v: string | null) => void;
  region: string | null;
  setRegion: (v: string | null) => void;
}

const HubContext = createContext<HubContextValue | null>(null);

export function useHub() {
  const ctx = useContext(HubContext);
  if (!ctx) throw new Error('useHub must be used within HubProvider');
  return ctx;
}

export function HubProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<MemberRole | null>(null);
  const [macroArea, setMacroAreaRaw] = useState<string | null>(null);
  const [region, setRegionRaw] = useState<string | null>(null);

  const setMacroArea = (v: string | null) => {
    setMacroAreaRaw(v === 'all' ? null : v);
    setRegionRaw(null);
  };
  const setRegion = (v: string | null) => {
    setRegionRaw(v === 'all' ? null : v);
  };

  return (
    <HubContext.Provider value={{ role, setRole, macroArea, setMacroArea, region, setRegion }}>
      {children}
    </HubContext.Provider>
  );
}
