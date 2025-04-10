export interface Employe {
  id?: number;
  nom: string;
  prenom: string;
  poste: string;
  email: string;
  telephone: number;
  dateEmbauche: Date;
  salaire: number;
  contrat?: { id: number };
  equipe?: { id: number };
}