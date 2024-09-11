import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components';
import { formSchema } from './schema';
import { IVehicleOwnerRegister } from '@types';
import { CREATE_VEHICLE_OWNER } from '@graphql';
import { useLanguage, useNotification } from '@hooks';

interface CreateVehicleOwnerProps {
  onClose?: () => void;
}

export function CreateVehicleOwner({ onClose }: CreateVehicleOwnerProps) {
  const { showNotificationSuccess } = useNotification();
  const handleLanguage = useLanguage();
  const form = useForm<IVehicleOwnerRegister>({
    resolver: zodResolver(formSchema(handleLanguage)),
    defaultValues: {
      name: '',
      lastname: '',
      age: 18,
    },
  });

  const [createOwner, { loading }] = useMutation(CREATE_VEHICLE_OWNER, {
    onCompleted: () => {
      onClose && onClose();
      form.reset();
      showNotificationSuccess('VEHICLE_OWNER.REGISTER.SUCCESS');
    },
  });

  const onSubmit = (values: IVehicleOwnerRegister) => {
    createOwner({ variables: { input: { ...values, age: Number(values.age) } } });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{handleLanguage('VEHICLE_OWNER.FIELDS.NAME')}</FormLabel>
              <FormControl>
                <Input placeholder={handleLanguage('VEHICLE_OWNER.FIELDS.NAME')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{handleLanguage('VEHICLE_OWNER.FIELDS.LASTNAME')}</FormLabel>
              <FormControl>
                <Input placeholder={handleLanguage('VEHICLE_OWNER.FIELDS.LASTNAME')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{handleLanguage('VEHICLE_OWNER.FIELDS.AGE')}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={handleLanguage('VEHICLE_OWNER.FIELDS.AGE')}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {handleLanguage(`COMMON.BUTTON.${loading ? 'CREATING' : 'CREATE'}`)}
        </Button>
      </form>
    </Form>
  );
}
