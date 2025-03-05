import { Chantier } from "./Chantier";
import { User } from "./User";
export class Zones {
  id!: number;
  nom!: string;
  chantier!: Chantier;


  description!: string;
  user!: User;


}
