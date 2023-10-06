'use client';

import { useState, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { SessionInterface } from '@/types';
import { Menu, Transition } from '@headlessui/react';

type Props = {
  session: SessionInterface;
};

export default function ProfileMenu({ session }: Props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="relative z-40 flex flex-col items-center justify-center">
      <Menu as="div">
        <Menu.Button
          className="flex items-center justify-center"
          onMouseEnter={() => setOpenModal(true)}
        >
          {session?.user?.image && (
            <Image
              src={session.user.image}
              width={40}
              height={40}
              className="rounded-full"
              alt="user profile image"
            />
          )}
        </Menu.Button>

        <Transition
          show={openModal}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="absolute right-1/2 mt-3 flex min-w-max translate-x-1/2 flex-col items-center justify-start rounded-xl border border-nav-border bg-white p-7 shadow-menu sm:min-w-[18.75rem]"
            onMouseLeave={() => setOpenModal(false)}
          >
            <div className="flex flex-col items-center gap-y-4">
              {session?.user?.image && (
                <Image
                  src={session?.user?.image}
                  className="rounded-full"
                  width={80}
                  height={80}
                  alt="profile Image"
                />
              )}
              <p className="font-semibold">{session?.user?.name}</p>
            </div>

            <div className="flex w-full flex-col items-start gap-3 pt-10">
              <Menu.Item>
                <Link href="edit-profile" className="text-sm">
                  Settings
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href={`/profile/${session?.user?.id}`}
                  className="text-sm"
                >
                  Profile
                </Link>
              </Menu.Item>
            </div>
            <div className="flexStart mt-5 w-full border-t border-nav-border pt-5">
              <Menu.Item>
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
