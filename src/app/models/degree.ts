

export const DEGREE_TYPES = [
  'PhD', 'MSc', 'BSc', 'Deploma', 'Certificate',
];

export enum DegreeType {
  PHD = 'PhD',
  MSC = 'MSc',
  BSC = 'BSc',
  DEPLOMA = 'Deploma',
  CERTIFICATE = 'Certificate',
}

export interface DegreeInterface {
  id: number;
  name: string;
  type: DegreeType;
  programme: string;
  cgpa?: number;
}

export class Degree implements DegreeInterface {
  id: number;
  name: string;
  type: DegreeType;
  programme: string;
  cgpa?: number;
  constructor(private data?: DegreeInterface) {
    Object.assign(this, data);
  }
}
