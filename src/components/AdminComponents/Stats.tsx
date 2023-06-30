import {api} from "~/utils/api";
import { useEffect } from "react";

const Stats = ({ petData }) => {

  const {
    data: pet,
    refetch: refetchPet,
    isLoading, isError,
  } = api.pet.getAllPets.useQuery();

  useEffect(() => {
    void refetchPet();
  }, [petData, refetchPet]);

  if (isLoading) {
    return <span className="loading loading-ball loading-lg"></span>;
  }

  if (isError) {
    return <div>Error fetching pet data.</div>;
  }

  const catCount = pet?.filter((p) => p.category === "Gato").length || 0;
  const dogCount = pet?.filter((p) => p.category === "Perro").length || 0;
  const adoptedCount = pet?.filter((p) => p.adopted).length || 0;
  const unadoptedCount = catCount + dogCount - adoptedCount;
  const totalPets= catCount + dogCount;

  return (
    <div className="stats stats-vertical shadow lg:stats-horizontal">

      <div className="stat">
        <div className="stat-title">Animales</div>
        <div className="stat-value">{totalPets}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Gatos</div>
        <div className="stat-value">{catCount}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Perros</div>
        <div className="stat-value">{dogCount}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Adoptados</div>
        <div className="stat-value">{adoptedCount}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Sin Adoptar</div>
        <div className="stat-value">{unadoptedCount}</div>
      </div>

    </div>
  );
};

export default Stats;
