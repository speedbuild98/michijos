import { Menu, Transition } from '@headlessui/react';
import { FiMenu } from 'react-icons/fi';
import Avatar from './Avatar';
import { useSession } from "next-auth/react";
import { BsGearFill } from "react-icons/bs"
import { AiOutlineHome, AiOutlineTeam, AiOutlineHeart } from "react-icons/ai"
import {TbCat} from "react-icons/tb"
import Link from 'next/link';
import LoginButton from '../AuthComponents/LoginButton';

export default function SideMenuMobile() {
  const { data: sessionData } = useSession();

  return (
    <Menu>
      <Menu.Button>
        <FiMenu className="w-7 h-7" />
      </Menu.Button>
      <Transition
        className="absolute top-10 left-0 bg-base-100 h-screen w-1/2 p-5 z-10 md:max-w-[300px]" // Aumenta el índice z a un valor más alto, como z-10
        enter="transition-transform duration-1000"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-1000"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Menu.Items>
          <Menu.Item>
            {({ }) => (
              <div className='flex flex-row justify-between'>
              <Avatar h="h-12" />
              <BsGearFill className='opacity-50' />
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
              <>
              <p className='mt-5 opacity-40'>
                ¡Hola!
              </p>
              <span className='text-neutral font-[500]'>
                {sessionData?.user.name}
              </span>
              </>
          </Menu.Item>
          <Menu.Item>
            <div className='flex flex-row items-center font-[500] gap-5 mt-8'>
              <AiOutlineHome />
              <Link href="/">Inicio</Link>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div className='flex flex-row items-center font-[500] gap-5 mt-8'>
              <AiOutlineHeart />
              <Link href="/favorite-pets">Favoritos</Link>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div className='flex flex-row items-center font-[500] gap-5 mt-8'>
              <TbCat />
              <Link href="/pets">Mascotas</Link>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div className='flex flex-row items-center font-[500] gap-5 mt-8'>
              <AiOutlineTeam />
              <Link href="/ongs">Organizaciones</Link>
            </div>
          </Menu.Item>
          <Menu.Item>
            <LoginButton />
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
