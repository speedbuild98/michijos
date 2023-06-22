import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DateTime } from "luxon";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const petId = parseInt(id, 10);

  const {
    data: pet,
    refetch: refetchPet,
    isLoading,
  } = api.pet.getPetById.useQuery({ petId });

  const updatePet = api.pet.updatePet.useMutation({
    onSuccess: () => {
      setTimeout(() => {
        router
          .push("/admin")
          .then(() => {
            // Success callback
          })
          .catch((error) => {
            console.log(error);
          });
      }, 3500);
    },
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setUpdatedPet((prevPet) => ({
      ...prevPet,
      [name]: inputValue,
    }));
  };

  const handleUpdatePet = async (event) => {
    event.preventDefault();
    toast.success("Mascota actualizada exitosamente", {
      icon: "😸",
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
    });
    await updatePet.mutateAsync(updatedPet);
  };

  const [updatedPet, setUpdatedPet] = useState({
    name: pet?.data.name || "",
    age: pet?.data.age || "",
    category: "Gato",
    description: pet?.data.description || "",
    image: pet?.data.image || "",
    weight: pet?.data.weight || "",
    adopted: pet?.data.adopted || false, // Utilizar el valor booleano directamente
    gender: pet?.data.gender || "Macho",
    characteristics: pet?.data.characteristics || "",
    breed: pet?.data.breed || "Mestizo",
    id: petId,
    updatePet: DateTime.now().toString(),
  });
  
  return (
    <div className="mx-auto border-r border-primary p-[20px]">
      <p className="text-3xl font-black uppercase text-accent">UPDATE PET ID: {petId}</p>
      <form onSubmit={handleUpdatePet} className="mx-auto mt-10 flex flex-col">
        <div className="mb-2">
          <label
            htmlFor="name"
            className="text-ghost mb-2 block text-sm font-medium"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="input-bordered input-primary input w-full max-w-xs"
            value={updatedPet.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="age"
            className="text-ghost mb-2 block text-sm font-medium"
          >
            Edad:
          </label>
          <input
            type="text"
            id="age"
            name="age"
            required
            className="input-bordered input-primary input w-full max-w-xs "
            value={updatedPet.age}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="age"
            className="text-ghost mb-2 block text-sm font-medium"
          >
            Raza:
          </label>
          <input
            type="text"
            id="breed"
            name="breed"
            required
            className="input-bordered input-primary input w-full max-w-xs "
            value={updatedPet.breed}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="category"
            className="text-ghost mb-2 block text-sm font-medium"
          >
            Categoría:
          </label>
          <select
            id="category"
            name="category"
            required
            className="input-bordered input-primary input w-full max-w-xs"
            value={updatedPet.category}
            onChange={handleInputChange}
            defaultValue={"Gato"}
          >
            <option value="Gato">Gato</option>
            <option value="Perro">Perro</option>
          </select>
        </div>

        <div className="mb-2">
          <label
            htmlFor="image"
            className="text-ghost mb-2 block text-sm font-medium"
          >
            URL de la imagen:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            className="input-bordered input-primary input w-full max-w-xs"
            value={updatedPet.image}
            required
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="weight"
            className="text-ghost mb-2 block text-sm font-medium"
          >
            Peso:
          </label>
          <input
            type="text"
            id="weight"
            name="weight"
            required
            className="input-bordered input-primary input w-full max-w-xs"
            value={updatedPet.weight}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="isMale"
            className="text-ghost mb-2 block text-sm font-medium"
          >
            Género:
          </label>
          <select
            id="gender"
            name="gender"
            required
            className="input-bordered input-primary input w-full max-w-xs"
            value={updatedPet.gender}
            onChange={handleInputChange}
            defaultValue={"Macho"}
          >
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>

        <div className="mb-2">
          <label
            htmlFor="characteristics"
            className="text-ghost mb-2 block text-sm font-medium"
          >
            Características:
          </label>
          <input
            type="text"
            id="characteristics"
            name="characteristics"
            required
            className="input-bordered input-primary input w-full max-w-xs"
            value={updatedPet.characteristics}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="image"
            className="text-ghost mb-2 block text-sm font-medium"
          >
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="textarea-primary textarea w-full max-w-xs"
            value={updatedPet.description}
            onChange={handleInputChange}
          ></textarea>

          <div className="form-control">
            <label htmlFor="adopted" className="label cursor-pointer">
              <span className="label-text">Adoptado</span>
              <input
                type="checkbox"
                name="adopted"
                checked={updatedPet.adopted}
                onChange={handleInputChange}
                className="checkbox-primary checkbox"
              />
            </label>
          </div>
        </div>

        <button type="submit" className="btn-primary btn">
          Actualizar Mascota
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
