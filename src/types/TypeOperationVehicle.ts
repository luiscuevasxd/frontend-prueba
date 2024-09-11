import { IVehicle } from './Vehicle';

export interface ITypeOperationVehicle {
  id: number;
  name: string;
  code: string;
  description: string;
  vehicles: IVehicle[];
  status: number;
  createdAt: string;
}
