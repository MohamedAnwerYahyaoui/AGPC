import {Tache} from "./tache.model";

class Timesheet {
}

export interface User {
  id: number; // Identifiant unique de l'utilisateur
  username: string; // Nom d'utilisateur
  email: string; // Adresse e-mail de l'utilisateur
  taches?: Tache[]; // Liste des tâches associées à l'utilisateur (optionnel)
  timesheets?: Timesheet[]; // Liste des feuilles de temps associées à l'utilisateur (optionnel)
}
