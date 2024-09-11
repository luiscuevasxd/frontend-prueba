import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from '@components';
import { CreateVehicleOwner } from '../vehicle-owner';
import { useLanguage } from '@hooks';

export function VehicleOwnerRegisterModal() {
  const [open, setOpen] = useState(false);
  const handleLanguage = useLanguage();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {handleLanguage('VEHICLE_OWNER.DIALOG_VEHICLE_LIST.BUTTON')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{handleLanguage('VEHICLE_OWNER.DIALOG_VEHICLE_LIST.TITLE')}</DialogTitle>
        </DialogHeader>
        <CreateVehicleOwner onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
