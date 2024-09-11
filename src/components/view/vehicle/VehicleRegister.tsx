import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@components';
import { vehicleSchema } from './schema';
import { IList, ITypeOperationVehicle, IVehicleOwner, IVehicleRegister } from '@types';
import { useLanguage, useNotification } from '@hooks';
import {
  CREATE_VEHICLE,
  GET_TYPE_OPERATION_VEHICLES,
  GET_VEHICLE_OWNERS,
  UPDATE_VEHICLE,
} from '@graphql';
import { VehicleRegisterProps } from './types';

export const VehicleRegister: React.FC<VehicleRegisterProps> = ({ vehicle, onClose }) => {
  const { showNotificationSuccess } = useNotification();
  const handleLanguage = useLanguage();
  const form = useForm<IVehicleRegister>({
    resolver: zodResolver(vehicleSchema(handleLanguage)),
    defaultValues: {
      brand: '',
      model: '',
      price: undefined,
      typeOperationVehicleId: undefined,
      vehicleOwnerId: undefined,
    },
  });

  const { loading: loadingVehicleOwner, data: vehicleOwners } = useQuery<{
    getVehicleOwners: IList<IVehicleOwner>;
  }>(GET_VEHICLE_OWNERS, {
    variables: { page: 1, perPage: 1000 },
    fetchPolicy: 'cache-and-network',
  });
  const { loading: loadingTypeOperationVehicle, data: typeOperationVehicles } = useQuery<{
    getTypeOperationVehicles: ITypeOperationVehicle[];
  }>(GET_TYPE_OPERATION_VEHICLES, {
    variables: { page: 1, perPage: 1000 },
  });

  const [saveVehicle, { loading: saveLoading }] = useMutation(CREATE_VEHICLE, {
    onCompleted: () => {
      onClose && onClose();
      form.reset();
      showNotificationSuccess('VEHICLE.REGISTER.SUCCESS');
    },
  });

  const [updateVehicle, { loading: updateLoading }] = useMutation(UPDATE_VEHICLE, {
    onCompleted: () => {
      onClose && onClose();
      form.reset();
      showNotificationSuccess('VEHICLE.UPDATE.SUCCESS');
    },
  });

  useEffect(() => {
    if (vehicle?.id) {
      form.reset({
        brand: vehicle.brand,
        model: vehicle.model,
        price: vehicle.price,
        typeOperationVehicleId: String(vehicle.typeOperationVehicleId),
        vehicleOwnerId: String(vehicle.vehicleOwnerId),
      });
    }
  }, [vehicle, form]);

  const onSubmit = async (values: IVehicleRegister) => {
    if (!vehicle?.id)
      return saveVehicle({
        variables: {
          input: {
            ...values,
            vehicleOwnerId: Number(values.vehicleOwnerId),
            typeOperationVehicleId: Number(values.typeOperationVehicleId),
          },
        },
      });

    return updateVehicle({
      variables: {
        input: {
          ...values,
          id: vehicle.id,
          vehicleOwnerId: Number(values.vehicleOwnerId),
          typeOperationVehicleId: Number(values.typeOperationVehicleId),
        },
      },
    });
  };

  if (loadingVehicleOwner || loadingTypeOperationVehicle) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="vehicleOwnerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{handleLanguage('VEHICLE.FIELDS.VEHICLE_OWNER')}</FormLabel>
              <Select onValueChange={field.onChange} value={String(field.value ?? '')}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(vehicleOwners?.getVehicleOwners?.data ?? []).map((owner) => (
                    <SelectItem key={owner.id} value={String(owner.id)}>
                      {owner.name} {owner.lastname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="typeOperationVehicleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{handleLanguage('VEHICLE.FIELDS.TYPE_OPERATION_VEHICLE')}</FormLabel>
              <Select onValueChange={field.onChange} value={String(field.value ?? '')}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(typeOperationVehicles?.getTypeOperationVehicles ?? []).map((owner) => (
                    <SelectItem key={owner.id} value={String(owner.id)}>
                      {owner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{handleLanguage('VEHICLE.FIELDS.BRAND')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{handleLanguage('VEHICLE.FIELDS.MODEL')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{handleLanguage('VEHICLE.FIELDS.PRICE')}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={saveLoading}>
          {handleLanguage(
            `COMMON.BUTTON.${vehicle?.id ? (updateLoading ? 'SAVING' : 'SAVE') : saveLoading ? 'CREATING' : 'CREATE'}`
          )}
        </Button>
      </form>
    </Form>
  );
};
