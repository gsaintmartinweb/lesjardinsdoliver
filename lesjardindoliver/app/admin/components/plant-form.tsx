import { useForm } from "react-hook-form";
import { Plant } from "@prisma/client";
import FormUpload from "../../components/form-upload";
import { createPlant } from "@/app/actions/create-plant";

const PlantForm = ({ onClose, onPlantCreated }: { onClose: () => void, onPlantCreated: () => void }) => {   
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Plant>({
    defaultValues: {
      src: "",
      title: "",
      description: "",
      advice: "",
      price: "0",
    },
  });

  const onSubmit = async (plant: Plant) => {
    const response = await createPlant(plant);
    onPlantCreated();
    reset();
    onClose();

    console.log(response);
    // try {
    //   const response = await axios.post("/api/plants", {
    //     src: data.src,
    //     title: data.title,
    //     description: data.description,
    //     advice: data.advice,
    //     price: data.price,
    //   });
    //   onPlantCreated();
    //   reset();
    //   onClose();
    // } catch (error) {
    //   console.error("Error creating plant:", error);
    // }
  };

  const handleFileUpload = (fileUrl: string) => {
    console.log("File uploaded:", fileUrl);
    
    // Extract the filename from the URL
    const fileName = fileUrl.split("/").pop();
    
    console.log("File name parsed:", fileName);
    if (fileName) {
      setValue("src", fileName); // Save only the filename
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nom:
        </label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.title && (
          <span className="text-red-500 text-xs">
            Ce champ est requis
          </span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ajouter une image pour cette plante:
        </label>
        <FormUpload onFileUpload={handleFileUpload} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description:
        </label>
        <input
          type="text"
          {...register("description", { required: true })}
          className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.description && (
          <span className="text-red-500 text-xs">
            Ce champ est requis
          </span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Conseils:
        </label>
        <input
          type="text"
          {...register("advice", { required: true })}
          className=" text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.advice && (
          <span className="text-red-500 text-xs">
            Ce champ est requis
          </span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Prix:
        </label>
        <input
          type="text"
          {...register("price", { required: true })}
          className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.price && (
          <span className="text-red-500 text-xs">
            Ce champ est requis
          </span>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
};

export default PlantForm;