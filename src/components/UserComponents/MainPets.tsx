import { useState } from "react";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import PetCard from "./PetCard";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const MainPets = () => {
  const [filter, setFilter] = useState("all"); // Estado para el filtro seleccionado
  const { data: sessionData } = useSession();

  const {
    data: pets
  } = api.pet.getAllPets.useQuery();

  // Función para aplicar el filtro
  const applyFilter = (filter) => {
    setFilter(filter);
  };

  // Filtrar las mascotas según el filtro seleccionado
  const filteredPets = pets
  ? pets.filter((pet) => {
      if (filter === "all") {
        return !pet.adopted;
      } else if (filter === "cats") {
        return !pet.adopted && pet.category === "Gato";
      } else if (filter === "dogs") {
        return !pet.adopted && pet.category === "Perro";
      } else if (filter === "adopted") {
        return pet.adopted;
      } else if (filter === "male") {
        return !pet.adopted && pet.gender === "Macho";
      } else if (filter === "female") {
        return !pet.adopted && pet.gender === "Hembra";
      }
    })
  : [];

  const displayedPets = filteredPets.slice(0, 4);


  return (
    <section className="mt-4 flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-[500] text-neutral">
          Mascotas en adopción
        </h1>
        <Link
          className="flex flex-row items-center text-xs text-[#929292] "
          href="/pets"
        >
          Ver todas <BsChevronRight />{" "}
        </Link>
      </div>
      <p className="mb-2 text-xs text-[#929292] opacity-50">
        Mascotas cercanas a tu ubicación
      </p>
      <div className="flex flex-row flex-wrap justify-between gap-4 md:justify-start">
      {filteredPets.length === 0 ? (
          <p className="text-error text-center">No tenemos mascotas disponibles en adopción con el filtro {filter}.</p>
        ) : (
          displayedPets.map((pet) => (
            <PetCard
              key={pet.id}
              name={pet.name}
              age={pet.age}
              gender={pet.gender}
              description={pet.description}
              image={pet.image}
              id={pet.id}
              adopted={pet.adopted}
              weight={pet.weight}
              characteristics={pet.characteristics}
              liked={pet.liked}
              userId={sessionData?.user?.id}
              phone={pet.phone}
              creatorId={pet.userId}
            />
          ))
        )}
      </div>
      <Link
        href="/pets"
        className="btn blue-degrade mx-auto mt-8 flex items-center justify-center rounded-[26px] text-center text-xs font-[500] text-base-100 shadow-md"
      >
        Ver más
      </Link>
    </section>
  );
};

export default MainPets;
