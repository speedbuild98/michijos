import { api } from "~/utils/api";

const AllPetsList = () => {
  const {
    data: pet,
    refetch: refetchPet,
    isLoading,
  } = api.pet.getAllPets.useQuery();
  
  return (
    <div className="flex flex-1 flex-col mt-10">
    <p className="font-black uppercase text-5xl text-info">Get All Pets</p>
    {isLoading ? (
      <span className="loading loading-spinner text-primary"></span>
    ) : (
      <div className="flex flex-col">
        {pet?.length === 0 && (
          <span className="text-error text-center">No hay mascotas</span>
        )}
        {pet?.map((pet) => (
          <li key={pet.id}>
            <p>{pet.name}</p>
            <p>{pet.description}</p>
          </li>
        ))}              
      </div>
    )}
  </div>
  )
}

export default AllPetsList