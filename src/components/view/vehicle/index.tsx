import React, { useEffect, useMemo, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components';
import { ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { GET_VEHICLES, CHANGE_STATUS_VEHICLE } from '@graphql';
import { IList, IVehicle, IVehicleFilter, SortOrder } from '@types';
import { VehicleOwnerRegisterModal } from './VehicleOwnerRegisterModal';
import { VehicleRegisterModal } from './VehicleRegisterModal';
import { useNotification } from '@hooks';

export const Vehicle = () => {
  const { showNotificationSuccess } = useNotification();
  const [filter, setFilter] = useState<IVehicleFilter>({
    page: 1,
    perPage: 25,
    search: '',
  });
  const [vehicleSelected, setVehicleSelected] = useState<IVehicle | null>(null);

  const [getVehicles, { data }] = useLazyQuery<{ getVehicles: IList<IVehicle> }>(GET_VEHICLES, {
    fetchPolicy: 'cache-and-network',
  });
  const [changeStatusVehicle] = useMutation(CHANGE_STATUS_VEHICLE, {
    onCompleted: () => {
      showNotificationSuccess('VEHICLE.CHANGE_STATUS.SUCCESS');
      getVehicles({ variables: { input: filter } });
    },
  });

  useEffect(() => {
    getVehicles({ variables: { input: filter } });
  }, [filter]);

  const handleSort = (column: string) => {
    if (filter.sortField === column) {
      setFilter({
        ...filter,
        sortOrder: filter.sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC,
      });
      return;
    }

    setFilter({
      ...filter,
      page: 1,
      sortField: column,
      sortOrder: SortOrder.ASC,
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      search: e.target.value,
      page: 1,
    });
  };

  const handlePageSizeChange = (value: string) => {
    setFilter({
      ...filter,
      page: 1,
      perPage: Number(value),
    });
  };

  const handlePageChange = (more: boolean) => {
    setFilter({
      ...filter,
      page: more ? filter.page++ : filter.page--,
    });
  };

  const list = useMemo(() => {
    return (data?.getVehicles.data ?? []).map((vehicle) => (
      <TableRow key={vehicle.id}>
        <TableCell>
          {vehicle.vehicleOwner.name} {vehicle.vehicleOwner.lastname}
        </TableCell>
        <TableCell>{vehicle.typeOperationVehicle.code}</TableCell>
        <TableCell>{vehicle.brand}</TableCell>
        <TableCell>{vehicle.model}</TableCell>
        <TableCell>{vehicle.price}</TableCell>
        <TableCell>
          <Switch
            checked={!!vehicle.status}
            onCheckedChange={() => changeStatusVehicle({ variables: { vehicleId: vehicle.id } })}
          />
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setVehicleSelected(vehicle)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert('muy pronto')}>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ));
  }, [data]);

  const handleClose = () => {
    getVehicles({ variables: { input: filter } });
    setVehicleSelected(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Buscar..."
          value={filter.search}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <div className="space-x-2">
          <VehicleOwnerRegisterModal />
          <VehicleRegisterModal vehicle={vehicleSelected} onClose={() => handleClose()} />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {[
              'Propietario',
              'Tipo de operación',
              'Marca',
              'Modelo',
              'Precio',
              'Estado',
              'Opciones',
            ].map((header) => (
              <TableHead key={header} onClick={() => handleSort(header.toLowerCase())}>
                {header}
                {filter.sortField === header.toLowerCase() &&
                  (filter.sortOrder === SortOrder.ASC ? (
                    <ChevronUp className="inline ml-1" />
                  ) : (
                    <ChevronDown className="inline ml-1" />
                  ))}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{list}</TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <Select value={String(filter.perPage ?? '')} onValueChange={handlePageSizeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar cantidad" />
          </SelectTrigger>
          <SelectContent>
            {[25, 50, 100].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size} por página
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-x-2">
          <Button onClick={() => handlePageChange(false)} disabled={(filter.page ?? 0) === 1}>
            Anterior
          </Button>
          <Button
            onClick={() => handlePageChange(true)}
            disabled={
              (filter.page ?? 1) * (filter.perPage ?? 1) >=
              (data?.getVehicles?.metaData?.totalCount ?? 0)
            }
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};
