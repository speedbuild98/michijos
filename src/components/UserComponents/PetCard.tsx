import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiMaleSign, BiFemaleSign } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { api } from "~/utils/api";
import Link from "next/link";

const PetCard = ({
  name,
  age,
  gender,
  description,
  image,
  id,
  adopted,
  weight,
  characteristics,
  liked,
  phone,
  userId,
  creatorId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userLiked, setUserLiked] = useState(liked);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const petLikes = api.pet.getPetLikes.useQuery({ petId: id, userId }).data;

  const likePet = api.pet.likePet.useMutation({ petId: id, userId });

  const creator = api.user.getUserById.useQuery({ userId: creatorId }).data;

  const handleLikePet = async () => {
    try {
      await likePet.mutateAsync({ petId: id, userId });
      setUserLiked(!userLiked);
    } catch (error) {
      console.error("Error al dar/quitar like:", error);
    }
  };

  useEffect(() => {
    setUserLiked(
      liked || (petLikes && petLikes.some((like) => like.userId === userId))
    );
  }, [petLikes, liked, userId]);

  return (
    <section className="ease flex h-[325px] w-[47%] cursor-pointer flex-col items-start justify-between overflow-hidden transition-all duration-500 hover:scale-105 md:w-80">
      <>
        <div className="h-full w-full" onClick={openModal}>
          <div className="relative h-[193px] w-full">
            <img
              className="h-full w-full rounded-xl object-cover"
              src={image}
              alt="pet"
            />
            <div className="flex flex-row items-center absolute right-2 top-2">
                <p className="text-xs font-bold text-base-100 mr-2">
                  {petLikes?.length === 0 ? 0 : petLikes?.length}
                </p>
            <span className=" flex h-5 w-5 flex-row items-center justify-center rounded-full bg-base-100">
                {userLiked ? (
                  <AiFillHeart className="text-accent" />
                ) : (
                  <AiOutlineHeart className="text-accent" />
                )}
            </span>
            </div>
          </div>
          <div className="mt-2 flex w-full flex-row items-center justify-between">
            <p className="text-md line-clamp-1 font-semibold text-neutral">
              {name || "Alpargata"}
            </p>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300">
              {gender === "Macho" ? (
                <BiMaleSign className="text-secondary" />
              ) : (
                <BiFemaleSign className="text-accent" />
              )}
            </span>
          </div>
          <p className="line-clamp-1 text-sm">{age}</p>
          <p className="mt-1 line-clamp-2 text-xs opacity-40">{description}</p>
        </div>
        <div className="mt-2 flex w-full flex-row justify-start">
          {!adopted === true ? (
            <Link
              target="_blank"
              href={`https://api.whatsapp.com/send?text=_%C2%A1Hola%21+Me+gustar%C3%ADa+saber+un+poco+m%C3%A1s+de+${encodeURIComponent(
                name
              )}%3A_%0A%0A*Edad%3A*+${encodeURIComponent(
                age
              )}%0A*G%C3%A9nero%3A*+${encodeURIComponent(
                gender
              )}%0A*Descripci%C3%B3n%3A*+${encodeURIComponent(
                description
              )}%0A&phone=${phone}`}
              className="blue-degrade btn-sm btn flex h-4 w-full flex-row items-center justify-center rounded-[26px] px-2 text-xs font-[500] text-base-100"
            >
              <FaWhatsapp className="mr-2 text-sm" /> Contactar
            </Link>
          ) : (
            <button className="flex w-full flex-row items-center justify-center rounded-[26px] border px-2 py-1 text-xs font-[500]">
              <AiFillHeart className="mr-2 text-sm text-accent" /> Adoptado
            </button>
          )}
        </div>
      </>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex min-h-screen items-center justify-center px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="z-50 mx-auto flex h-full w-screen flex-col rounded-3xl bg-base-100 p-5 py-8 md:w-96">
                <div className="relative flex flex-row items-start justify-start gap-2">
                  <p
                    className={`badge badge-outline font-bold capitalize ${
                      !adopted ? "badge-error" : "badge-success"
                    }`}
                  >
                    {!adopted ? "adoptado" : "En adopción"}
                  </p>
                  <p className="badge badge-primary badge-outline font-bold capitalize">
                    {characteristics}
                  </p>
                  <RxCross1
                    onClick={closeModal}
                    className="absolute right-0 top-0 cursor-pointer text-xl"
                  />
                </div>
                <div className="relative mt-5 h-[193px] w-full">
                  <img
                    className="h-full w-full rounded-xl object-cover"
                    src={image}
                    alt="pet"
                  />
                  <div className="absolute left-2 bottom-2">
                    <img className="w-12 h-12 rounded-full" src={creator?.data.image} alt={creator?.data.name} />
                    <p className="text-xs text-base-100">{creator?.data.name}</p>
                  </div>
                  <div className="absolute right-2 top-2 flex  flex-row items-center">
                    <p className="text-xl font-bold text-base-100 mr-2">
                      {petLikes?.length === 0 ? 0 : petLikes?.length}
                    </p>
                    <button
                      onClick={handleLikePet}
                      className=" flex btn btn-circle btn-sm focus:outline-none flex-row items-center justify-center rounded-full bg-base-100"
                    >
                      {userLiked ? (
                        <AiFillHeart className="text-xl text-accent" />
                      ) : (
                        <p>
                          <AiOutlineHeart className="text-xl text-accent" />
                        </p>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-2 flex w-full flex-row items-center justify-between">
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-md font-semibold text-primary">
                      {name || "Alpargata"}
                    </p>
                    <p className="ml-5 text-xs text-[]">{age}</p>
                    <p className="ml-5 text-xs text-[]">{weight} KG</p>
                  </div>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300">
                    {gender === "Macho" ? (
                      <BiMaleSign className="text-secondary" />
                    ) : (
                      <BiFemaleSign className="text-accent" />
                    )}
                  </span>
                </div>

                <p className="mt-3 text-xs overflow-x-auto max-h-[250px] text-justify pr-1">{description}</p>
                <div className="mt-10 flex w-full flex-row justify-start">
                  {!adopted === true ? (
                    <Link
                      target="_blank"
                      href={`https://api.whatsapp.com/send?text=_%C2%A1Hola%21+Me+gustar%C3%ADa+saber+un+poco+m%C3%A1s+de+${encodeURIComponent(
                        name
                      )}%3A_%0A%0A*Edad%3A*+${encodeURIComponent(
                        age
                      )}%0A*G%C3%A9nero%3A*+${encodeURIComponent(
                        gender
                      )}%0A*Descripci%C3%B3n%3A*+${encodeURIComponent(
                        description
                      )}%0A&phone=${phone}`}
                      className="blue-degrade btn-sm btn flex w-full flex-row items-center justify-center rounded-[26px] text-xs font-[500] text-base-100 shadow-md"
                    >
                      <FaWhatsapp className="mr-2 text-sm" /> Contactar
                    </Link>
                  ) : (
                    <button className="flex w-full flex-row items-center justify-center rounded-[26px] border px-2 py-1 text-xs font-[500]">
                      <AiFillHeart className="mr-2 text-sm text-accent" />{" "}
                      Adoptado
                    </button>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </section>
  );
};

export default PetCard;
