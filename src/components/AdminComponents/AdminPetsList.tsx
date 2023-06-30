import Link from "next/link";
import { api } from "~/utils/api";
import { DateTime } from "luxon";
import { BiFemaleSign, BiMaleSign } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import { catPlaceholder } from "~/assets";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Stats from "./Stats";
import { useState } from "react";

const AllPetsList = () => {

  const {
    data: pet,
    refetch: refetchPet,
    isLoading,
  } = api.pet.getAllUserPets.useQuery();

  const [petData, setPetData] = useState([]);
  const [sortColumn, setSortColumn] = useState("ID");
  const [sortDirection, setSortDirection] = useState("asc");

  const deletePet = api.pet.deletePet.useMutation({
    onSuccess: async () => {
      toast.success(`😿 Se ha eliminado a ${pet?.name}`, {
        position: "top-center",
        theme: "dark",
        autoClose: 3000,
        hideProgressBar: false,
        closeButton: true,
        pauseOnHover: false,
        draggable: false,
      });
      await refetchPet();
      setPetData(petData.filter((p) => p.id !== pet.id));
    },
  });

  if (isLoading) {
    return <span className="loading loading-ball loading-lg"></span>;
  }

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortPets = (pets) => {
    if (sortColumn === "ID") {
      return pets.sort((a, b) =>
        sortDirection === "asc" ? a.id - b.id : b.id - a.id
      );
    } else if (sortColumn === "Nombre") {
      return pets.sort((a, b) =>
        sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else if (sortColumn === "Tipo") {
      return pets.sort((a, b) =>
        sortDirection === "asc"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category)
      );
    } else if (sortColumn === "Raza") {
      return pets.sort((a, b) =>
        sortDirection === "asc"
          ? a.breed.localeCompare(b.breed)
          : b.breed.localeCompare(a.breed)
      );
    } else if (sortColumn === "Peso") {
      return pets.sort((a, b) =>
        sortDirection === "asc" ? a.weight - b.weight : b.weight - a.weight
      );
    } else if (sortColumn === "Adoptado") {
      return pets.sort((a, b) =>
        sortDirection === "asc"
          ? a.adopted - b.adopted
          : b.adopted - a.adopted
      );
    } else if (sortColumn === "Última Actualización") {
      return pets.sort((a, b) =>
        sortDirection === "asc"
          ? a.updatedAt - b.updatedAt
          : b.updatedAt - a.updatedAt
      );
    }
    return pets;
  };

  const filteredPets = sortPets(pet || []);

return (
    <div className="w-full overflow-x-auto mt-20 px-20">
      <span className="flex flex-col gap-10">
        <p className="text-5xl font-black uppercase text-start">Lista de mascotas</p>
        <div className="flex flex-col gap-5 items-start">
        <Link href="/admin/newpet" className="btn btn-base w-fit">
        🐈 Añadir nueva mascota
        </Link>
        <Stats petData={petData} />
        </div>
      </span>
        <table className="mt-10 table">
          {/* head */}
          <thead>
            <tr>
            <th className="cursor-pointer" onClick={() => handleSort("ID")}>
              ID {sortColumn === "ID" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th className="cursor-pointer" onClick={() => handleSort("Nombre")}>
              Nombre{" "}
              {sortColumn === "Nombre" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th className="cursor-pointer" onClick={() => handleSort("Tipo")}>
              Tipo {sortColumn === "Tipo" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th className="cursor-pointer" onClick={() => handleSort("Raza")}>
              Raza {sortColumn === "Raza" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th className="cursor-not-allowed">
              Edad
            </th>
            <th className="cursor-pointer" onClick={() => handleSort("Peso")}>
              Peso {sortColumn === "Peso" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th className="cursor-pointer" onClick={() => handleSort("Adoptado")}>
              Adoptado{" "}
              {sortColumn === "Adoptado" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th className="cursor-pointer" onClick={() => handleSort("Última Actualización")}>
              Última Actualización{" "}
              {sortColumn === "Última Actualización" &&
                (sortDirection === "asc" ? "▲" : "▼")}
            </th>
              <th>Organización</th>
            </tr>
          </thead>
          <tbody>
           {filteredPets?.map((pet) => (
              <tr key={pet.id}>
                <th>{pet?.id}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <Link href={`/pet-details/${pet.id}`} className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={pet?.image || catPlaceholder} alt={pet?.name}
                      />
                      </div>
                    </Link>
                    <div className="flex flex-row items-center">
                      <div className="text-sm opacity-50">
                        {pet?.gender === "Macho" ? (
                          <BiMaleSign className="text-xl text-info" />
                        ) : (
                          <BiFemaleSign className="text-xl text-error" />
                        )}
                      </div>
                      <div className="font-bold">{pet?.name}</div>
                    </div>
                  </div>
                </td>
                <td
                  className={
                    pet?.category === "Gato" ? "text-accent" : "text-primary"
                  }
                >
                  {pet?.category}
                </td>
                <td>{pet.breed}</td>
                <td>{pet.age}</td>
                <td>{`${pet.weight}KG`}</td>
                <td
                  className={
                    pet.adopted
                      ? "badge badge-success my-6"
                      : "badge badge-warning my-6"
                  }
                >
                  {pet.adopted ? "Adoptado" : "No adoptado"}
                </td>
                <td className="text-xs">
                  {(pet?.updatedAt).toLocaleString(DateTime.DATETIME_MED)}
                </td>
                <td>
                  <button
                    className="btn-error btn-xs btn"
                    onClick={() => void deletePet.mutate({ id: pet.id })}
                  >
                    <RiDeleteBinLine />
                  </button>
                  <Link href={`/admin/pet-edit/${pet.id}`} className="btn-success btn-xs btn ml-1">
                    <BsPencilSquare />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
  );
};

export default AllPetsList;
