'use client';

import Link from 'next/link';
import Image from 'next/image';

type Props = {
  id: string;
  image: string;
  title: string;
  name?: string;
  avatarURL?: string;
  userId?: string;
  isMini?: boolean;
};

export default function ProjectCard({
  id,
  image,
  title,
  name,
  avatarURL,
  userId,
  isMini = false,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl drop-shadow-2xl">
      <Link
        href={`/project/${id}`}
        className=" group relative flex h-full w-full items-center justify-center"
      >
        <Image
          src={image}
          width={414}
          height={314}
          className="h-full w-full rounded-2xl object-cover"
          alt={title}
        />
        <div className="absolute bottom-0 right-0 flex h-1/3 w-full items-end justify-end gap-2 rounded-b-2xl bg-gradient-to-b from-transparent to-black/50 p-4 text-lg font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      {!isMini && (
        <div className="mt-3 flex w-full items-center justify-between px-2 text-sm font-semibold">
          <Link href={`/profile/${userId}`}>
            <div className="flex items-center justify-center gap-2">
              <Image
                src={avatarURL || ''}
                width={24}
                height={24}
                className="rounded-full"
                alt="Profile Image"
              />
              <p>{name}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
