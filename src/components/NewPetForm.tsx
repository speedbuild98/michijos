import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewPetForm = () => {
  const router = useRouter();
  
  const [newPet, setNewPet] = useState({
    name: "",
    age: "",
    category: "Gato",
    description: "",
    image: "",
    weight: "",
    adopted: false,
    gender: "Macho",
    characteristics: "",
    breed: "Mestizo",
  });

  const createPet = api.pet.createPet.useMutation({
      onSuccess: () => {
      setNewPet({
        name: "",
        age: "",
        category: "",
        description: "",
        image: "",
        weight: "",
        adopted: false,
        gender: "",
        characteristics: "",
        breed: "",
      });

      toast.success("Mascota creada exitosamente", {
        icon: "😸",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      setTimeout(() => {
        router.push("/admin").then(() => {
          // Success callback
        }).catch((error) => {
          console.log(error);
        });
      }, 3500);
    },
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setNewPet((prevPet) => ({
      ...prevPet,
      [name]: inputValue,
    }));
  };

  const handleCreatePet = async (event) => {
    event.preventDefault();
    await createPet.mutateAsync(newPet);
  };

  return (
    <div className="p-[20px] border-r border-primary mx-auto">
      <p className="text-3xl font-black uppercase text-accent">Add New Pet</p>
      <form onSubmit={handleCreatePet} className="mx-auto mt-10 flex flex-col">
      
        <div className="mb-2">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-ghost"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="input-bordered input-primary input w-full max-w-xs"
            value={newPet.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="age"
            className="mb-2 block text-sm font-medium text-ghost"
          >
            Edad:
          </label>
          <input
            type="text"
            id="age"
            name="age"
            required
            className="input-bordered input-primary input w-full max-w-xs "
            value={newPet.age}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="age"
            className="mb-2 block text-sm font-medium text-ghost"
          >
            Raza:
          </label>
          <input
            type="text"
            id="breed"
            name="breed"
            required
            className="input-bordered input-primary input w-full max-w-xs "
            value={newPet.breed}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-ghost"
          >
            Categoría:
          </label>
          <select
            id="category"
            name="category"
            required
            className="input-bordered input-primary input w-full max-w-xs"
            value={newPet.category}
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
            className="mb-2 block text-sm font-medium text-ghost"
          >
            URL de la imagen:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            className="input-bordered input-primary input w-full max-w-xs"
            value={newPet.image}
            required
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="weight"
            className="mb-2 block text-sm font-medium text-ghost"
          >
            Peso:
          </label>
          <input
            type="text"
            id="weight"
            name="weight"
            required
            className="input-bordered input-primary input w-full max-w-xs"
            value={newPet.weight}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="isMale"
            className="mb-2 block text-sm font-medium text-ghost"
          >
            Género:
          </label>
          <select
            id="gender"
            name="gender"
            required
            className="input-bordered input-primary input w-full max-w-xs"
            value={newPet.gender}
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
            className="mb-2 block text-sm font-medium text-ghost"
          >
            Características:
          </label>
          <input
            type="text"
            id="characteristics"
            name="characteristics"
            required
            className="input-bordered input-primary input w-full max-w-xs"
            value={newPet.characteristics}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-medium text-ghost"
          >
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="textarea-primary textarea w-full max-w-xs"
            value={newPet.description}
            onChange={handleInputChange}
          ></textarea>

          <div className="form-control">
            <label htmlFor="adopted" className="label cursor-pointer">
              <span className="label-text">Adoptado</span>
              <input
                type="checkbox"
                name="adopted"
                checked={newPet.adopted}
                onChange={handleInputChange}
                className="checkbox-primary checkbox"
              />
            </label>
          </div>
        </div>

        <button type="submit" className="btn-primary btn">
          Crear Mascota
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};


export default NewPetForm