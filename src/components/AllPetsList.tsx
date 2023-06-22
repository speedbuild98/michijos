import Link from "next/link";
import { api } from "~/utils/api";
import { DateTime } from "luxon";
import { BiFemaleSign, BiMaleSign } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import {dogPlaceholder, catPlaceholder} from "~/assets/";

const AllPetsList = () => {
  const {
    data: pet,
    refetch: refetchPet,
    isLoading,
  } = api.pet.getAllPets.useQuery();

  const deletePet = api.pet.deletePet.useMutation({
    onSuccess: () => {
      void refetchPet();
    },
  });

  return (
      <div className="w-full overflow-x-auto px-[80px] mt-20">
        <p className="text-3xl font-black uppercase text-accent text-center">All Pets</p>
        <table className="mt-10 table">
          {/* head */}
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
                    <Link href={`/pets/${pet.id}`} className="avatar">
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
                <td>
                  <button
                    className="btn-error btn-xs btn"
                    onClick={() => void deletePet.mutate({ id: pet.id })}
                  >
                    <RiDeleteBinLine />
                  </button>
                  <button className="btn-success btn-xs btn ml-1">
                    <BsPencilSquare />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default AllPetsList;
