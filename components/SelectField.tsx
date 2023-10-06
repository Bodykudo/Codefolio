'use client';

import { MouseEvent } from 'react';
import Image from 'next/image';
import { Menu } from '@headlessui/react';

type Props = {
  title: string;
  state: string;
  filters: string[];
  setState: (value: string) => void;
};

export default function SelectField({
  title,
  state,
  filters,
  setState,
}: Props) {
  return (
    <div className="relative flex w-full flex-col items-center justify-start gap-7">
      <label htmlFor={title} className="w-full text-gray-100">
        {title}
      </label>
      <Menu as="div" className="relative self-start">
        <div>
          <Menu.Button className="flex w-full items-center justify-center gap-4 rounded-md bg-light-white-100 p-4 text-base capitalize outline-none">
            {state || 'Select a category'}
            <Image
              src="/arrow-down.svg"
              width={10}
              height={10}
              alt="Select category"
            />
          </Menu.Button>
        </div>
        <Menu.Items className="absolute left-0 mt-2 flex max-h-64 w-fit origin-top-right flex-col items-center justify-start overflow-y-auto rounded-xl border border-nav-border bg-white shadow-menu xs:min-w-[18.75rem]">
          {filters.map((filter) => (
            <Menu.Item key={filter}>
              <button
                type="button"
                value={filter}
                className="w-full self-start whitespace-nowrap px-5 py-2 text-left text-sm capitalize hover:bg-light-white-100"
                onClick={(e: MouseEvent<HTMLButtonElement>) =>
                  setState(e.currentTarget.value)
                }
              >
                {filter}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}
