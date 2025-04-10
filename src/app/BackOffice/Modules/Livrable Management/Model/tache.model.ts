
import {User} from "./user.model";
export enum Status {
  ToDo = 'ToDo',
  inprosses = 'inprosses',
  DONE = 'DONE'
}

export interface Tache {
  /*
  id: number;
  nom: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  status: Status;
  userId: number; // ID de l'utilisateur
  userNom: string; // Nom de l'utilisateur (pour affichage)
  */

  id: number;
  nom: string;
  description: string;
  dateDebut: Date | string;
  dateFin: Date | string;
  status: Status;
  userId: number;
  userNom?: string;






}