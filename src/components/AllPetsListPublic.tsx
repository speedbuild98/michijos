import Link from "next/link";
import { api } from "~/utils/api";
import { DateTime } from "luxon";
import { BiFemaleSign, BiMaleSign } from "react-icons/bi";

const AllPetsList = () => {
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

  const getUserName = (userId) => {
    const creator = user.find((u) => u.id === userId);
    if (creator) {
      return (
        <div className="flex flex-col items-center">
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
  

  return (
      <div className="w-full overflow-x-auto px-[80px] mt-10">
        <p className="text-3xl font-black uppercase text-accent text-center">Lista pública de mascotas</p>
        <table className="mt-10 table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Peso</th>
              <th>Adoptado</th>
              <th>Última Actualización</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pet?.map((pet) => (
              <tr key={pet.id}>
                <th>{pet?.id}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <Link href={`/pet-details/${pet.id}`} className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={pet?.image} alt={pet?.name}
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
                <td>{getUserName(pet.userId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default AllPetsList;
