import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import PlantForm from "./plant-form";
import { useState } from "react";

const CreatePlantModal = ({onPlantCreated}: {onPlantCreated: () => void}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger className="flex flex-col ">
          <button className="bg-gray-200 text-black px-4 py-2 rounded">
            <PlusCircledIcon /> Ajouter une plante
          </button>
        </Dialog.Trigger>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <Dialog.Title className="text-xl font-bold text-black mb-2">
              Ajouter une nouvelle plante
            </Dialog.Title>
            <PlantForm onClose={() => setIsOpen(false)} onPlantCreated={onPlantCreated} />
          </div>

          <Dialog.Close asChild>
            <button
              className=" absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-green-600 bg-gray-200 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default CreatePlantModal;