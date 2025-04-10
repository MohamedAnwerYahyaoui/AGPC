import { Livrable } from './Livrable';

export interface Equipe {
  id?: number;
  nom: string;
  nombreMembres: number;
  contactEquipe: string;
  dateCreation: Date;
  livrable?: Livrable; // objet complet
  livrable_id?: number;
  rating: number; // champ supplémentaire pour l'affichage
}
