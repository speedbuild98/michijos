import { api } from "~/utils/api";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RandomPetsHero = ({ name, age, gender, description, image, id, adopted, weight, characteristics }) => {

  const {
    data: pets,
    refetch: refetchPets,
    isLoading,
  } = api.pet.getAllPets.useQuery();

  const lastAddedPets = pets?.slice(-6); // Obtener las últimas 6 mascotas agregadas

  return (
    <section className="mt-3 flex h-[200px] w-full md:w-[50%] md:h-[350px] md:mx-auto flex-col items-center justify-center">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect="fade"
        navigation={false}
        pagination={{ clickable: false }}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="swiper-container z-0 w-full rounded-2xl shadow" // Asegúrate de que el índice z sea menor que el del sidemenu (z-0)
      >
        {lastAddedPets &&
          lastAddedPets.map((pet, index) => (
            <SwiperSlide className="cursor-pointer" key={index}>
                <img src={pet.image} className="h-full w-full object-cover" />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default RandomPetsHero;
