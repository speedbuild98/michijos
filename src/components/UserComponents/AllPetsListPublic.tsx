import Link from "next/link";
import { api } from "~/utils/api";
import { DateTime } from "luxon";
import { BiFemaleSign, BiMaleSign } from "react-icons/bi";
import { useState } from "react";

const AllPetsList = ({ searchQuery }) => {

  const [sortColumn, setSortColumn] = useState("ID");
  const [sortDirection, setSortDirection] = useState("asc");

  const {
    data: pet,
    refetch: refetchPet,
    isLoading,
  } = api.pet.getAllPets.useQuery();

  const {
    data: user,
    refetch: refetchUser,
  } = api.user.getAllUsers.useQuery();

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  

  const getUserName = (userId: string) => {
    const creator = user.find((u) => u.id === userId);
    if (creator) {
      return (
        <div className="flex flex-col items-start">
          <img
            src={creator.image}
            alt={creator.name}
            className="w-10 h-10 rounded-full ml-2"
          />
          <div className="text-xs">{creator.name}</div>
          <div className="text-xs opacity-50">{creator.email}</div>
        </div>
      );
    } else {
      return "Unknown";
    }
  };

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
    } else if (sortColumn === "Última Actualización") {
      return pets.sort((a, b) =>
        sortDirection === "asc"
          ? a.updatedAt - b.updatedAt
          : b.updatedAt - a.updatedAt
      );  
    }
    return pets;
  };

  const filteredPets = sortPets(
    pet?.filter(
      (pet) =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.id.toString().includes(searchQuery)
    )
  );
  

  return (
      // <div className="w-full overflow-x-auto px-[80px] mt-10">
      //   <p className="text-3xl font-black uppercase text-accent text-center">Lista pública de mascotas</p>
      //   <table className="mt-10 table">
      //   <thead>
      //     <tr>
      //       <th className="cursor-pointer" onClick={() => handleSort("ID")}>
      //         ID {sortColumn === "ID" && (sortDirection === "asc" ? "▲" : "▼")}
      //       </th>
      //       <th className="cursor-pointer" onClick={() => handleSort("Nombre")}>
      //         Nombre{" "}
      //         {sortColumn === "Nombre" && (sortDirection === "asc" ? "▲" : "▼")}
      //       </th>
      //       <th className="cursor-pointer" onClick={() => handleSort("Tipo")}>
      //         Tipo {sortColumn === "Tipo" && (sortDirection === "asc" ? "▲" : "▼")}
      //       </th>
      //       <th className="cursor-pointer" onClick={() => handleSort("Raza")}>
      //         Raza {sortColumn === "Raza" && (sortDirection === "asc" ? "▲" : "▼")}
      //       </th>
      //       <th className="cursor-not-allowed">
      //         Edad
      //       </th>
      //       <th className="cursor-pointer" onClick={() => handleSort("Peso")}>
      //         Peso {sortColumn === "Peso" && (sortDirection === "asc" ? "▲" : "▼")}
      //       </th>
      //       <th className="cursor-pointer" onClick={() => handleSort("Adoptado")}>
      //         Adoptado{" "}
      //         {sortColumn === "Adoptado" && (sortDirection === "asc" ? "▲" : "▼")}
      //       </th>
      //       <th className="cursor-pointer" onClick={() => handleSort("Última Actualización")}>
      //         Última Actualización{" "}
      //         {sortColumn === "Última Actualización" &&
      //           (sortDirection === "asc" ? "▲" : "▼")}
      //       </th>
      //       <th>ONG</th>
      //     </tr>
      //   </thead>
      //     <tbody>
      //     {filteredPets?.map((pet) => (
      //         <tr key={pet.id}>
      //           <th>{pet?.id}</th>
      //           <td>
      //             <div className="flex items-center space-x-3">
      //               <Link href={`/pet-details/${pet.id}`} className="avatar">
      //                 <div className="mask mask-squircle h-12 w-12">
      //                 <img
      //                   src={pet?.image} alt={pet?.name}
      //                 />
      //                 </div>
      //               </Link>
      //               <div className="flex flex-row items-center">
      //                 <div className="text-sm opacity-50">
      //                   {pet?.gender === "Macho" ? (
      //                     <BiMaleSign className="text-xl text-info" />
      //                   ) : (
      //                     <BiFemaleSign className="text-xl text-error" />
      //                   )}
      //                 </div>
      //                 <div className="font-bold">{pet?.name}</div>
      //               </div>
      //             </div>
      //           </td>
      //           <td
      //             className={
      //               pet?.category === "Gato" ? "text-accent" : "text-primary"
      //             }
      //           >
      //             {pet?.category}
      //           </td>
      //           <td>{pet.breed}</td>
      //           <td>{pet.age}</td>
      //           <td>{`${pet.weight}KG`}</td>
      //           <td
      //             className={
      //               pet.adopted
      //                 ? "badge badge-success my-6"
      //                 : "badge badge-warning my-6"
      //             }
      //           >
      //             {pet.adopted ? "Adoptado" : "No adoptado"}
      //           </td>
      //           <td className="text-xs">
      //             {(pet?.updatedAt).toLocaleString(DateTime.DATETIME_MED)}
      //           </td>
      //           <td>{getUserName(pet.userId)}</td>
      //         </tr>
      //       ))}
      //     </tbody>
      //   </table>
      // </div>
      <div className="blue-degrade h-screen w-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl text-center font-black text-secondary">MASCOTAS PUBLICAS</h1>
      </div>
  );
};

export default AllPetsList;
