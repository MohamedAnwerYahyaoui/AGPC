
import { tache } from "./Tache";
import { expences } from "./Expences";

export class Budget {
  id!: number;
  nom!: string;
  montant!: number;
  description!: string;
  expences: expences[] = []; // Ensure expences is an array
  totalExpenses!: number; // Add a property for total expenses
  montant_left!: number;
  tache!: tache;
}