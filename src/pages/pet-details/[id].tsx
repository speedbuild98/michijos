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

  const userId = pet?.data.userId;

  const {
    data: user,
    isLoading: userIsLoading,
  } = api.user.getUserById.useQuery({ userId });

  const updatedAtDate = new Date(pet?.data.updatedAt);

  const formattedDate = updatedAtDate.toLocaleString(DateTime.DATETIME_MED);

  return(
    <div>
      <h1>Mascota {petId}: {pet?.data.name}</h1>
      <p>Edad: {pet?.data.age}</p>
      <p>Tipo: {pet?.data.category}</p>
      <p>Raza: {pet?.data.breed}</p>
      <p>Peso: {pet?.data.weight}</p>
      <p>Adoptado: {pet?.data.adopted}</p>
      <p>Última Actualización: {formattedDate}</p>
      {userIsLoading ? (
        <p>Cargando usuario...</p>
      ) : (
        <p>Usuario Creador: {user?.data.name}</p>
      )}
      <p>Descripción: {pet?.data.description}</p>
      <p>Características: {pet?.data.characteristics}</p>
    </div>
  )
}