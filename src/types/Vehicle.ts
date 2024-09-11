import { SortOrder } from './Common';
import { ITypeOperationVehicle } from './TypeOperationVehicle';
import { IVehicleOwner } from './VehicleOwner';

export interface IVehicle {
  id: number;
  brand: string;
  model: string;
  price: number;
  status: number;
  createdAt: string;
  typeOperationVehicleId: number;
  typeOperationVehicle: ITypeOperationVehicle;
  vehicleOwnerId: number;
  vehicleOwner: IVehicleOwner;
}

export interface IVehicleFilter {
  page: number;
  perPage: number;
  sortOrder?: SortOrder;
  sortField?: string;
  search?: string;
  brand?: string;
  model?: string;
  typeOperationVehicleId?: number;
  vehicleOwnerId?: number;
  status?: number;
}

export interface IVehicleRegister {
  brand: string;
  model: string;
  price: number;
  typeOperationVehicleId: string;
  vehicleOwnerId: string;
}
