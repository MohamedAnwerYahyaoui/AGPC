import { Etat } from './etat.enum';

export interface Congee {
  id?: number;
  nom: string;
  dateDebut: Date;
  dateFin: Date;
  etat: Etat;
  //employee_id?: number;
  employe?: { id: number };
}

