export interface IPotrosnja {
  id: number;
  predjenoKm?: number | null;
}

export type NewPotrosnja = Omit<IPotrosnja, 'id'> & { id: null };
