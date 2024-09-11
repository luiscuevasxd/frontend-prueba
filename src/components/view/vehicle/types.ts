import { IVehicle } from '@types';

export interface VehiclesQueryVariables {
  page: number;
  pageSize: number;
  search?: string;
}

export interface VehicleRegisterProps {
  vehicle?: IVehicle | null;
  onClose: () => void;
}
