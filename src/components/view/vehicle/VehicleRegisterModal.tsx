import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from '@components';
import { useLanguage } from '@hooks';
import { VehicleRegister } from './VehicleRegister';
import { VehicleRegisterProps } from './types';

export function VehicleRegisterModal({ vehicle, onClose }: VehicleRegisterProps) {
  const [open, setOpen] = useState(false);
  const handleLanguage = useLanguage();

  useEffect(() => {
    if (vehicle?.id) setOpen(true);
  }, [vehicle]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{handleLanguage('VEHICLE.DIALOG_VEHICLE_LIST.BUTTON')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{handleLanguage('VEHICLE.DIALOG_VEHICLE_LIST.TITLE')}</DialogTitle>
        </DialogHeader>
        <VehicleRegister
          vehicle={vehicle}
          onClose={() => {
            setOpen(false);
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
