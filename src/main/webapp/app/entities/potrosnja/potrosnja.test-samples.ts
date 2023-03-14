import { IPotrosnja, NewPotrosnja } from './potrosnja.model';

export const sampleWithRequiredData: IPotrosnja = {
  id: 49085,
};

export const sampleWithPartialData: IPotrosnja = {
  id: 72215,
  predjenoKm: 78620,
};

export const sampleWithFullData: IPotrosnja = {
  id: 6204,
  predjenoKm: 15906,
};

export const sampleWithNewData: NewPotrosnja = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
