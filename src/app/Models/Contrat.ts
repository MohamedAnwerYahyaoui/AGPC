import { TypeContrat } from 'src/app/Models/TypeContrat';
export { TypeContrat };

export interface Contrat {
  [x: string]: any;
  id?: number;
  dateDebut: string;
  dateFin: string;
  contrat: TypeContrat;
}
