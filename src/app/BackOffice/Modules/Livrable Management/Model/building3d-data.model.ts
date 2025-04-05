import {BuildingModel} from "./building.model";

export interface Building3DData extends BuildingModel {
  height: number;
  roofType: string;
  roomsPerFloor: { [floor: number]: number };
  roomColors?: number[]; // Pour personnaliser les couleurs des pièces
}

