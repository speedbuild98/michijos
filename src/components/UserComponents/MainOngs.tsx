import { useState } from "react";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";
import PetCard from "./PetCard";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const MainOngs = () => {
  const { data: sessionData } = useSession();

  const ONG = api.user.getAllAdminUsers.useQuery().data;

  return (
    <section className="mt-4 flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-[500] text-neutral">
          Organizaciones
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
        {ONG?.map((ong) => (
          <PetCard
            key={ong.id}
            name={ong.name}
            description={ong.description}
            image={ong.image}
            id={ong.id}
            phone={ong.phone}
            creatorId={ong.userId}
          />
        ))}
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

export default MainOngs;
