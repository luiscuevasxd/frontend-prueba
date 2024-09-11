import { IUser } from './User';
import { IVehicle } from './Vehicle';

export interface IVehicleOwner {
  id: number;
  name: string;
  lastname: string;
  age: number;
  userId: number;
  user: IUser;
  vehicles: IVehicle[];
  status: number;
  createdAt: string;
}

export interface IVehicleOwnerRegister {
  id?: number;
  name: string;
  lastname: string;
  age: number;
}
